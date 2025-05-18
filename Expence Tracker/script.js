import{formatCurrency,formatDate} from './utils.js';



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
        this.saveToLocalStorage();
        this.uppdateSummary();
        console.log('New transaction added: ', tx.toObject());
    }
    

    remove(id){
        this.transactions = this.transactions.filter((tx) => tx.id !== id);
        this.saveToLocalStorage(); // חדש
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
    saveToLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions.map(tx => tx.toObject())));
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const manager = new TransactionManager();
    const transactionBody = document.getElementById('transactions-body');

    loadFromLocalStorage();


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


    function loadFromLocalStorage() {
        const stored = localStorage.getItem('transactions');
        if (stored) {
            const data = JSON.parse(stored);
            
            // קובע את האידי האחרון
            Transaction._lastId = Math.max(...data.map(tx => tx.id), 0);
    
            // מוסיף לרשימה ידנית, לא דרך manager.add()
            manager.transactions = data.map(obj => new Transaction(
                obj.type,
                obj.description,
                parseFloat(obj.amount),
                obj.category,
                new Date(obj.date)
            ));
    
            // מוסיף לטבלה
            manager.transactions.forEach(tx => appendTransactionToTable(tx));
            
            // סיכום מחדש
            manager.uppdateSummary();
        }
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

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️ Light Mode';
    } else {
        body.classList.add('light-mode');
        toggleButton.textContent = '🌙 Dark Mode';
    }

    // Toggle mode
    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');

        body.classList.toggle('dark-mode', !isDark);
        body.classList.toggle('light-mode', isDark);

        toggleButton.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
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

            manager.saveToLocalStorage();
            manager.uppdateSummary();
            filterAndRender(); // re-render filtered list
            modal.classList.add('hidden');
        }
    });



});