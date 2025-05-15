let number = Math.floor(Math.random() * 100) + 1;

let message = document.getElementById("message");

let input = document.getElementById("guessInput");
const resetButton = document.getElementById("resetButton");


let count = 0;
let tries = document.getElementById("tries");

const guessButton = document.getElementById("guessButton");

guessButton.addEventListener('click', () => {
    let guess = parseInt(input.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = "מה זה הדבר הזה, מה את/ה לא יודע/ת לקרוא";
        return;
    }
    if (guess === number) {
        message.style.color = 'green';
        message.textContent = 'יפה מאוד, ניחשת את המספר נכון, שהיה: ' + number;
        return;
    }
    else if (guess < number) {
        message.style.color = 'red';
        message.textContent = 'נמוך מידי, נסה שוב';
    }
    else {
        message.style.color = 'red';
        message.textContent = 'גבוהה מידי, נסה שוב';
    }
    count++;
    tries.textContent = "נסיונות: " + count;
    if (count === 10) {
        message.textContent = 'נגמרו הנסיונות, המספר היה: ' + number;
    }
});
resetButton.addEventListener('click', () => {
    location.reload();
});