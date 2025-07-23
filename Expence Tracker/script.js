// ✨ ייבוא auth, provider, ו-db מתוך firebase-config.js
import { auth, provider, db } from "./firebase-config.js";

// ✨ ייבוא פונקציות הנדרשות מ-Firebase SDKs
import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    query,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✨ ייבוא פונקציות עזר לעיצוב מטבע ותאריך
import { formatCurrency, formatDate } from "./utils.js";

// ✨ שליפת האלמנטים מה-HTML לפי ID/קלאס
const googleLoginBtn = document.getElementById("google-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const appContentWrapper = document.getElementById("app-content-wrapper"); // ✨ ודא שזה נשלף כאן

const form = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");
const typeEl = document.getElementById("type");
const transactionsBody = document.getElementById("transactions-body");

const totalExpensesEl = document.getElementById('total-expenses');
const totalIncomeEl = document.getElementById('total-income');
const balanceEl = document.getElementById('balance');
const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('type-filter');

const modal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const closeModalBtn = document.getElementById('close-modal');
const editIdEl = document.getElementById('edit-id');
const editTypeEl = document.getElementById('edit-type');
const editDescriptionEl = document.getElementById('edit-description');
const editAmountEl = document.getElementById('edit-amount');
const editCategoryEl = document.getElementById('edit-category');


let currentUser = null;
let unsubscribe = null;

// ✨ מאזין לשינויים במצב ההתחברות של המשתמש
onAuthStateChanged(auth, user => {
    if (user) {
        currentUser = user;
        googleLoginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        if (appContentWrapper) { // ✨ ודא שהאלמנט קיים לפני הגישה ל-style
            appContentWrapper.style.display = "block";
        }
        loadExpenses();
    } else {
        currentUser = null;
        googleLoginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        if (appContentWrapper) { // ✨ ודא שהאלמנט קיים לפני הגישה ל-style
            appContentWrapper.style.display = "none";
        }
        transactionsBody.innerHTML = "";
        totalExpensesEl.textContent = formatCurrency(0);
        totalIncomeEl.textContent = formatCurrency(0);
        balanceEl.textContent = formatCurrency(0);
        if (unsubscribe) unsubscribe();
    }
});

// ✨ פונקציית התחברות עם Google
const googleLogin = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (e) {
        console.error("Login failed:", e);
    }
};

// ✨ פונקציית יציאה מהחשבון
const logout = async () => {
    await signOut(auth);
};

// ✨ הוספת מאזיני אירועים לכפתורי ההתחברות והיציאה
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', googleLogin);
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}


// ✨ מאזין לשליחה של הטופס - הוספת טרנזקציה חדשה ל-Firestore
form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!currentUser) {
        console.warn("No user logged in. Cannot add transaction.");
        return;
    }

    const data = {
        description: descriptionEl.value.trim(),
        amount: parseFloat(amountEl.value),
        category: categoryEl.value,
        type: typeEl.value,
        timestamp: Date.now(),
        userId: currentUser.uid
    };

    if (!data.type || !data.description || isNaN(data.amount) || !data.category) {
        console.error('Please provide valid inputs for all fields.');
        return;
    }

    try {
        await addDoc(collection(db, `users/${currentUser.uid}/transactions`), data);
        form.reset();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// ✨ פתיחת מודל העריכה עם נתוני הטרנזקציה
transactionsBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const docId = e.target.dataset.id;
        if (!currentUser || !docId) return;

        try {
            const docRef = doc(db, `users/${currentUser.uid}/transactions`, docId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const tx = docSnap.data();
                editIdEl.value = docId;
                editTypeEl.value = tx.type;
                editDescriptionEl.value = tx.description;
                editAmountEl.value = tx.amount;
                editCategoryEl.value = tx.category;
                modal.classList.remove('hidden');
            } else {
                console.warn("Transaction not found for editing.");
            }
        } catch (error) {
            console.error("Error fetching document for edit:", error);
        }
    }
});

// ✨ סגירת מודל העריכה
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// ✨ שמירת טרנזקציה ערוכה ל-Firestore
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) {
        console.warn("No user logged in. Cannot edit transaction.");
        return;
    }

    const docId = editIdEl.value;
    const updatedData = {
        type: editTypeEl.value,
        description: editDescriptionEl.value.trim(),
        amount: parseFloat(editAmountEl.value),
        category: editCategoryEl.value,
    };

    if (!updatedData.type || !updatedData.description || isNaN(updatedData.amount) || !updatedData.category) {
        console.error('Please provide valid inputs for all fields in edit form.');
        return;
    }

    try {
        await updateDoc(doc(db, `users/${currentUser.uid}/transactions`, docId), updatedData);
        modal.classList.add('hidden');
    } catch (e) {
        console.error("Error updating document: ", e);
    }
});

// ✨ מחיקת הוצאה מ-Firestore
transactionsBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const docId = e.target.dataset.id;
        if (!currentUser || !docId) return;

        if (confirm("Are you sure you want to delete this transaction?")) {
            try {
                await deleteDoc(doc(db, `users/${currentUser.uid}/transactions`, docId));
            } catch (e) {
                console.error("Error deleting document: ", e);
            }
        }
    }
});


// ✨ שליפה ועדכון רשימת ההוצאות למשתמש המחובר בזמן אמת (onSnapshot)
function loadExpenses() {
    if (!currentUser) {
        console.warn("loadExpenses called without a current user.");
        return;
    }
    const q = query(
        collection(db, `users/${currentUser.uid}/transactions`)
    );

    if (unsubscribe) unsubscribe();

    unsubscribe = onSnapshot(q, (snapshot) => {
        transactionsBody.innerHTML = "";
        let totalExpenses = 0;
        let totalIncome = 0;

        snapshot.docs.forEach(docSnap => {
            const item = docSnap.data();
            const docId = docSnap.id;
            
            if (item.type === 'expense') {
                totalExpenses += item.amount;
            } else if (item.type === 'income') {
                totalIncome += item.amount;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDate(new Date(item.timestamp))}</td>
                <td class="${item.type}">${item.type[0].toUpperCase() + item.type.slice(1)}</td>
                <td>${item.description}</td>
                <td class="${item.type}">${formatCurrency(item.amount)}</td>
                <td>${item.category[0].toUpperCase() + item.category.slice(1)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" data-id="${docId}">Edit</button>
                        <button class="delete-btn" data-id="${docId}">Delete</button>
                    </div>
                </td>
            `;
            transactionsBody.appendChild(tr);
        });

        totalExpensesEl.textContent = formatCurrency(totalExpenses);
        totalIncomeEl.textContent = formatCurrency(totalIncome);
        balanceEl.textContent = formatCurrency(totalIncome - totalExpenses);

        filterAndRender();
    }, (error) => {
        console.error("Error fetching documents:", error);
    });
}

// ✨ פונקציות הסינון והחיפוש
function filterAndRender() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    
    Array.from(transactionsBody.children).forEach(row => {
        const descriptionCell = row.children[2].textContent.toLowerCase();
        const typeCell = row.children[1].textContent.toLowerCase();

        const matchesType = selectedType === 'all' || typeCell === selectedType;
        const matchesSearch = descriptionCell.includes(searchText);

        if (matchesType && matchesSearch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ✨ מאזינים לאירועי שינוי בתיבת החיפוש ובפילטר
searchInput.addEventListener('input', filterAndRender);
typeFilter.addEventListener('change', filterAndRender);


// ✨ קוד לניהול מצב כהה/בהיר - נשאר ללא שינוי מהקובץ המקורי שלך
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️ Light Mode';
    } else {
        body.classList.add('light-mode');
        toggleButton.textContent = '🌙 Dark Mode';
    }

    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');

        body.classList.toggle('dark-mode', !isDark);
        body.classList.toggle('light-mode', isDark);

        toggleButton.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
});
