const API_KEY = "c57b759a92ca18245851eae4";
const BASE_URL = "https://v6.exchangerate-api.com/v6";

class CurrencyManager {
    constructor() {
    this.baseCurrency = "ILS";
    this.rates = {};
    this.loadUpdate = null;

    this.init();
    }

    async init() {
        await this.fetchRates();
        this.attachEvents();
    }

    async fetchRates() {
        const url = `${BASE_URL}/${API_KEY}/latest/${this.baseCurrency}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.result !== "success") {
                throw new Error("API error");
            }

            this.rates = data.conversion_rates;
            this.loadUpdate = new Date(data.time_last_update_utc);
            this.updateUI();
        } catch (error) {
        console.error("Error fetching exchange rates:", error);
        }
    }
    // update ui holy fucking shit

    updateUI() {
        document.getElementById("eur").innerText = (this.rates.EUR ?? 0).toFixed(4);
        document.getElementById("ils").innerText = (this.rates.ILS ?? 0).toFixed(4);
        document.getElementById("gbp").innerText = (this.rates.GBP ?? 0).toFixed(4);
        document.getElementById("usd").innerText = (this.rates.USD ?? 0).toFixed(4);

        document.getElementById("last-updated").innerText =
        this.loadUpdate.toLocaleString("en-US");
    }

    attachEvents() {
        document
            .getElementById("refresh-button")
            .addEventListener("click", async () => {
            const base = document.getElementById("base-currency").value;

            if (base.length === 3) {
                this.baseCurrency = base;
                await this.fetchRates();
            } else {
                alert("Please select a valid currency.");
            }
            });

        // Optional: auto-refresh when selecting new currency without button click
        document
            .getElementById("base-currency")
            .addEventListener("change", async (e) => {
                this.baseCurrency = e.target.value;
                await this.fetchRates();
            });
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    new CurrencyManager();

  // Dark mode toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

  // Load theme from storage
const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    } else {
        body.classList.add("light-mode");
        toggleButton.textContent = "🌙 Dark Mode";
}

    toggleButton.addEventListener("click", () => {
        const isDark = body.classList.contains("dark-mode");

        body.classList.toggle("dark-mode", !isDark);
        body.classList.toggle("light-mode", isDark);

        toggleButton.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
        localStorage.setItem("theme", isDark ? "light" : "dark");
    });
});
