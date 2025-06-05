const API_KEY = "c57b759a92ca18245851eae4";
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

class CurrencyManager {
    constructor() {
        this.baseCurrency = 'ILS';
        this.supported = ['EUR', 'ILS', 'GBP', 'USD'];
        this.rates = {};
        this.lastUpdated = null;
        this.initUI();
        this.fetchAndDisplayRates();
    }

    initUI() {
        this.baseSelect = document.getElementById('base-currency');
        this.refreshBtn = document.getElementById('refresh-rates');
        this.errorDiv = document.getElementById('exchange-error');
        this.ratesLine = document.getElementById('exchange-rates-line');

        this.baseSelect.value = this.baseCurrency;
        this.baseSelect.addEventListener('change', () => {
            this.baseCurrency = this.baseSelect.value;
            this.fetchAndDisplayRates();
        });
        this.refreshBtn.addEventListener('click', () => this.fetchAndDisplayRates());
    }

    async fetchAndDisplayRates() {
        this.errorDiv.style.display = 'none';
        this.ratesLine.textContent = 'Loading...';
        try {
            const url = `${BASE_URL}/${API_KEY}/latest/${this.baseCurrency}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.result !== 'success') throw new Error(data['error-type'] || 'API error');
            this.rates = data.conversion_rates;
            this.lastUpdated = new Date();
            this.updateLine();
        } catch (error) {
            this.errorDiv.textContent = 'Failed to fetch exchange rates.';
            this.errorDiv.style.display = 'block';
            this.ratesLine.textContent = '';
        }
    }

    updateLine() {
        const parts = [];
        for (const cur of this.supported) {
            const val = this.rates[cur];
            if (val !== undefined) {
                parts.push(`${cur} ${val.toFixed(4)}`);
            }
        }
        this.ratesLine.textContent = parts.join(' ');
        this.ratesLine.setAttribute('data-timestamp', `Last updated: ${this.lastUpdated.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' })}`);
    }
}

function renderMonthlyChart(transactions) {
    const monthlyData = {};
    for (const tx of transactions) {
        const date = new Date(tx.date);
        const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };
        monthlyData[month][tx.type] += tx.amount;
    }

    const labels = Object.keys(monthlyData);
    const incomeData = labels.map(m => monthlyData[m].income);
    const expenseData = labels.map(m => monthlyData[m].expense);

    new Chart(document.getElementById('monthly-chart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Income', data: incomeData, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
                { label: 'Expense', data: expenseData, backgroundColor: 'rgba(255, 99, 132, 0.6)' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Income vs Expense',
                    font: { size: 16 }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Month' } },
                y: { title: { display: true, text: 'Amount (ILS)' } }
            }
        }
    });
}

function renderCategoryChart(transactions) {
    const categoryTotals = {};
    let totalExpenses = 0;
    for (const tx of transactions) {
        if (tx.type === 'expense') {
            categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
            totalExpenses += tx.amount;
        }
    }

    const labels = Object.keys(categoryTotals);
    const data = labels.map(c => categoryTotals[c]);
    

    new Chart(document.getElementById('category-chart'), {
        type: 'doughnut',
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: labels.map((_, i) => `hsl(${i * 45}, 70%, 60%)`)
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const amount = ctx.raw;
                            const percent = ((amount / totalExpenses) * 100).toFixed(1);
                            return `${ctx.label}: ILS ${amount.toFixed(2)} (${percent}%)`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Expenses by Category',
                    font: { size: 16 }
                }
            }
        }
    });
}

function renderTopCategories(transactions) {
    const categoryTotals = {};
    let totalExpenses = 0;
    for (const tx of transactions) {
        if (tx.type === 'expense') {
            categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
            totalExpenses += tx.amount;
        }
    }

    const sorted = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const ul = document.getElementById('top-categories');
    ul.innerHTML = '';
    sorted.forEach(([category, amount]) => {
        const li = document.createElement('li');
        const percent = ((amount / totalExpenses) * 100).toFixed(1);
        li.textContent = `${category}: ILS ${amount.toFixed(2)} (${percent}%)`;
        ul.appendChild(li);
    });
    ul.style.display = sorted.length > 0 ? 'block' : 'none';
    if (sorted.length === 0) {
        ul.innerHTML = '<li>No expenses recorded.</li>';
    }
}

function initStatistics() {
    const raw = localStorage.getItem('transactions');
    if (!raw) return;
    const transactions = JSON.parse(raw).map(t => ({
        ...t,
        date: new Date(t.date)
    }));

    renderMonthlyChart(transactions);
    renderCategoryChart(transactions);
    renderTopCategories(transactions);
}

document.addEventListener('DOMContentLoaded', () => {
    new CurrencyManager();
    initStatistics();
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

});
