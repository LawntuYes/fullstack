// ✨ ייבוא firebase-config שמכיל את ההגדרות של Firebase
import { auth, provider, db } from "./firebase-config.js";

// ✨ ייבוא של פעולות Authentication ו-Firestore
import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";

// ✨ שליפת האלמנטים מה-HTML לפי ID
const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
const form = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const typeEl = document.getElementById("type");
const transactionsBody = document.getElementById("transactions-body");
const logoutBtn = document.getElementById("logout");

let currentUser = null;
let unsubscribe = null;

// ✨ מאזין לשינויים במצב ההתחברות של המשתמש
onAuthStateChanged(auth, user => {
    if (user) {
        currentUser = user;
        authDiv.style.display = "none";
        appDiv.style.display = "block";
        loadExpenses();
    } else {
        currentUser = null;
        authDiv.style.display = "block";
        appDiv.style.display = "none";
        transactionsBody.innerHTML = "";
        if (unsubscribe) unsubscribe();
    }
});

// ✨ התחברות עם Google - נפתחת חלונית קופצת
window.googleLogin = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (e) {
        alert("Login failed: " + e.message);
    }
};

// ✨ יציאה מהחשבון
window.logout = async () => {
    await signOut(auth);
};

// ✨ מאזין לשליחה של הטופס - מוסיף הוצאה ל-Firestore
form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!currentUser) return;

    const data = {
        description: descriptionEl.value,
        amount: parseFloat(amountEl.value),
        category: categoryEl.value,
        type: typeEl.value,
        timestamp: Date.now()
    };

    try {
        await addDoc(collection(db, `expenses/${currentUser.uid}/items`), data);
        form.reset();
    } catch (e) {
        alert("Add failed: " + e.message);
    }
});

// ✨ עריכת הוצאה קיימת לפי ID
window.editTransaction = async (id, old) => {
    const newDesc = prompt("Description:", old.description);
    const newAmt = prompt("Amount:", old.amount);
    const newCat = prompt("Category:", old.category);
    const newType = prompt("Type (expense/income):", old.type);

    if (newDesc && newAmt && newCat && newType && currentUser) {
        await updateDoc(doc(db, `expenses/${currentUser.uid}/items`, id), {
            description: newDesc,
            amount: parseFloat(newAmt),
            category: newCat,
            type: newType
        });
    }
};

// ✨ מחיקת הוצאה לפי ID
window.deleteTransaction = async id => {
    if (currentUser) {
        await deleteDoc(doc(db, `expenses/${currentUser.uid}/items`, id));
    }
};

// ✨ שליפה ועדכון רשימת ההוצאות למשתמש המחובר
function loadExpenses() {
    const q = collection(db, `expenses/${currentUser.uid}/items`);
    unsubscribe = onSnapshot(q, snapshot => {
        transactionsBody.innerHTML = "";
        snapshot.docs.forEach(docSnap => {
            const item = docSnap.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${new Date(item.timestamp).toLocaleDateString()}</td>
                <td>${item.type}</td>
                <td>${item.description}</td>
                <td>₪${item.amount.toFixed(2)}</td>
                <td>${item.category}</td>
                <td>
                    <button onclick="editTransaction('${docSnap.id}', ${JSON.stringify(item)})">✏️</button>
                    <button onclick="deleteTransaction('${docSnap.id}')">🗑️</button>
                </td>
            `;
            transactionsBody.appendChild(tr);
        });
    });
}


class Transaction{
    static _lastId = 0

    constructor(type, description, amount, category, date = new Date()){
        this.id = ++Transaction._lastId; //כדי שהתז כל פעם יגדל באחד
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }

    toObject(){
        return{
        id: this.id,
        type: this.type,
        description: this.description,
        amount: this.amount,
        category: this.category,
        date: this.date.toISOString(),  
        };
    }
}

class TransactionManager {
    constructor() {
        this.transactions = [];
    }

    add(tx) {
        this.transactions.push(tx);
        this.addExpense();
        this.uppdateSummary();
        console.log('New transaction added: ', tx.toObject());
    }
    

    remove(id){
        this.transactions = this.transactions.filter((tx) => tx.id !== id);
        this.addExpense(); // חדש
        this.uppdateSummary();
    }

    uppdateSummary(){
        const totalExpenses= this.transactions.filter((tx)=> tx.type === 'expense')
        .reduce((acc,curr)=> acc+curr.amount, 0);
        
        const totalIncome= this.transactions.filter((tx)=> tx.type === 'income')
        .reduce((acc,curr)=> acc+curr.amount, 0);

        const balance = totalIncome - totalExpenses;

        document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
        document.getElementById('total-income').textContent = formatCurrency(totalIncome);
        document.getElementById('balance').textContent = formatCurrency(balance);


    }
//saves to local storage
    // saveToLocalStorage() {
    //     localStorage.setItem('transactions', JSON.stringify(this.transactions.map(tx => tx.toObject())));
    // }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const manager = new TransactionManager();
    const transactionBody = document.getElementById('transactions-body');

    loadExpenses();


    form.addEventListener('submit', (e) => {
        e.preventDefault()//מונע את הריפרש של העמוד

        const type = form.querySelector('#type').value;
        const description = form.querySelector('#description').value.trim();
        const category = form.querySelector('#category').value;
        const amountVal = form.querySelector('#amount').value;
        const amount = parseFloat(amountVal);

        if(!type || !description || isNaN(amount) || !category){
            console.error('Please provide a valid inputs');
            return;
        }
        
        const tx = new Transaction(type,description,amount,category);
        manager.add(tx);
        appendTransactionToTable(tx);
        form.reset();
    });

    transactionBody.addEventListener('click', (e) => {
        if(e.target.classList.contains('delete-btn')){
            const id = Number(e.target.dataset.index)
            manager.remove(id);
            e.target.closest('tr').remove();
        }
    });

    function appendTransactionToTable(tx){
        const tr = document.createElement('tr')
    
        tr.innerHTML =`
        <td>${formatDate(tx.date)}</td>
        <td class=${tx.type}>${tx.type[0].toUpperCase() + tx.type.slice(1)}</td>
        <td>${tx.description}</td>
        <td class= ${tx.type}>${formatCurrency(tx.amount)}</td>
        <td>${tx.category[0].toUpperCase() + tx.category.slice(1)}</td>
        <td>
            <div class="action-buttons">
                <button class="edit-btn" data-index=${tx.id}>Edit</button>
                <button class="delete-btn" data-index=${tx.id}>Delete</button>
            </div>
        </td>`;

        transactionBody.appendChild(tr);
    }
    const searchInput = document.getElementById('search');
    const typeFilter = document.getElementById('type-filter');


    searchInput.addEventListener('input', filterAndRender);
    typeFilter.addEventListener('change', filterAndRender);

    function filterAndRender() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;

    // Clear existing table
    transactionBody.innerHTML = '';

    const filtered = manager.transactions.filter(tx => {
        const matchesType = selectedType === 'all' || tx.type === selectedType;
        const matchesSearch = tx.description.toLowerCase().includes(searchText);
        return matchesType && matchesSearch;
    });

    filtered.forEach(tx => appendTransactionToTable(tx));
    }
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // 🎨 Dark Mode Toggle
    const darkModeBtn = document.getElementById("dark-mode-toggle");

    if (darkModeBtn) {
        // טען נושא מה-localStorage
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
        }

        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            // שמור את המצב
            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }


    
    //edit button
    const modal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModalBtn = document.getElementById('close-modal');

    // Open modal with values
    transactionBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = Number(e.target.dataset.index);
            const tx = manager.transactions.find(t => t.id === id);

            if (tx) {
                document.getElementById('edit-id').value = tx.id;
                document.getElementById('edit-type').value = tx.type;
                document.getElementById('edit-description').value = tx.description;
                document.getElementById('edit-amount').value = tx.amount;
                document.getElementById('edit-category').value = tx.category;

                modal.classList.remove('hidden');
            }
        }
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Save edited transaction
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = Number(document.getElementById('edit-id').value);
        const updatedTx = manager.transactions.find(t => t.id === id);

        if (updatedTx) {
            updatedTx.type = document.getElementById('edit-type').value;
            updatedTx.description = document.getElementById('edit-description').value;
            updatedTx.amount = parseFloat(document.getElementById('edit-amount').value);
            updatedTx.category = document.getElementById('edit-category').value;

            manager.addExpense();
            manager.uppdateSummary();
            filterAndRender(); // re-render filtered list
            modal.classList.add('hidden');
        }
    });



});