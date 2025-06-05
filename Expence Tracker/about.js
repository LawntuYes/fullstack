document.addEventListener('DOMContentLoaded', () => {
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