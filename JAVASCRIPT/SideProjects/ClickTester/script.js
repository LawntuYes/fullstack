let clickCount = 0;
let startTime;

function startClickTest() {
    clickCount = 0;
    startTime = Date.now();
    document.getElementById('clickButton').disabled = false;
    document.getElementById('result').textContent = 'Clicks: 0';
    document.getElementById('cps').textContent = 'Clicks per Second: 0';
}

function handleClick() {
    clickCount++;
    const elapsedTime = (Date.now() - startTime) / 1000; // in seconds

    // Prevent division by zero
    const cps = elapsedTime > 0 ? (clickCount / elapsedTime).toFixed(2) : 0;

    document.getElementById('result').textContent = `Clicks: ${clickCount}`;
    document.getElementById('cps').textContent = `Clicks per Second: ${cps}`;
}

function endClickTest() {
    document.getElementById('clickButton').disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clickButton').addEventListener('click', handleClick);
    document.getElementById('startButton').addEventListener('click', startClickTest);
    document.getElementById('endButton').addEventListener('click', endClickTest);
});