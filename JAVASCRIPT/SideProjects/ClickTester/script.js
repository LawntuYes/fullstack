let clickCount = 0;
let startTime = null;

function startClickTest() {
    clickCount = 0;
    startTime = Date.now(); // Set the start time
    document.getElementById('clickButton').disabled = false; // Enable the click button
    document.getElementById('result').textContent = 'Clicks: 0';
    document.getElementById('cps').textContent = 'Clicks per Second: 0.00';
}

function handleClick() {
    if (!startTime) {
        // If startTime is not set, return early to avoid errors
        return;
    }

    clickCount++;
    const elapsedTime = (Date.now() - startTime) / 1000; // Calculate elapsed time in seconds

    // Calculate CPS and format to 2 decimal places
    const cps = elapsedTime > 0 ? (clickCount / elapsedTime).toFixed(2) : '0.00';

    document.getElementById('result').textContent = `Clicks: ${clickCount}`;
    document.getElementById('cps').textContent = `Clicks per Second: ${cps}`;
}

function endClickTest() {
    document.getElementById('clickButton').disabled = true; // Disable the click button
    startTime = null; // Reset startTime to prevent further calculations
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure all buttons are properly connected to their respective functions
    const startButton = document.getElementById('startButton');
    const clickButton = document.getElementById('clickButton');
    const endButton = document.getElementById('endButton');

    if (startButton && clickButton && endButton) {
        startButton.addEventListener('click', startClickTest);
        clickButton.addEventListener('click', handleClick);
        endButton.addEventListener('click', endClickTest);
    } else {
        console.error('One or more buttons are missing in the HTML.');
    }
});