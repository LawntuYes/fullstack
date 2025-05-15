// let age = 20

// if (age === 20) {
//     console.log('you are 20 years old');
// }

// if (age < 18) {
//     console.log('You are a minor.');

// }
// else if (age >= 18 && age <=65) {
//     console.log('you are an adult');
// }
// else {
//     console.log('you are a senior');
// }

// let day = 3;

// switch (day) {
//     case 1:
//         console.log('Today is Monday');
//         break;
//     case 2:
//         console.log('Today is Tuesday');
//         break;
//     case 3:
//         console.log('Today is Wednesday');
//         break;
//     case 4:
//         console.log('Today is Thursday');
//         break;
//     case 5:
//         console.log('Today is Friday');
//         break;
//     case 6:
//         console.log('Today is Saturday');
//         break;
//     case 7:
//         console.log('Today is Sunday');
//         break;
//     default:
//         console.log('Invalid day');
//         break;
// }

// for (let i = 0; i <= 10; i++) {
//     console.log(i);   
// }

// for (let i = 0; i <= 20; i+=2) {
//     console.log(i);
// }




console.log('Welcome to the number guessing game!');
console.log('You have 10 attempts to guess the currect number between 1 and 100');
let number = Math.floor(Math.random() * 100) + 1;

let count = 0;
while (count < 10) {
    let userInput = prompt('Please enter your guess:');
    let guess = parseInt(userInput);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log('Invalid input. Please enter a number');
        continue;
    }
    if (guess === number) {
        console.log('Congratulations! You guessed the correct number, which was: ' + number);
        break;
    }
    else if (guess < number) {
        console.log('Too low! Try again');
    }
    else {
        console.log('Too high! Try again');
    }
    count++;
    console.log(`attempts left: ${10 - count}`);
}
if (count === 10) {
    console.log('Sorry, you have run out of attempts');
    console.log('The correct number was ' + number);
}

