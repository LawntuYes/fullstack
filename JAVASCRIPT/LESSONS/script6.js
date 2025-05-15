//Objects nigga

const student = {
    fname: 'Misha',
    lname: 'Goldin',
    age: 18,
    fullname: function () { return `${this.fname} ${this.lname}`; }
}

// console.log(student.fullname());
// console.log(student.age);

student.age = 19;
student.test = 'test'
// console.log(student);


const car = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    getDetails: function () { return `${this.make} ${this.model} - ${this.year}`; }
}
// console.log(car.getDetails());

const car2 = car;

car2.year = 2021;

// console.log(car.year);

const fruits = ['Apple', 'Orange', 'Banana'];
// fruits.push('Mango'); // Add value

// console.log(fruits);
// fruits.pop() // Remove value
// console.log(fruits);

// fruits.unshift('Mango'); //Add value to start
// console.log(fruits);

// fruits.shift();
// console.log(fruits);


// const uppercaseFruits = fruits.map((fruit) => fruit.toUpperCase());
// // console.log(uppercaseFruits);

// const objArrFruits = fruits.map((item) => ({
//     name: item,
//     amount: 2,
//     words: item.length,
//     id: fruits.map((fruit) => fruit).indexOf(item)
// }))
// console.log(objArrFruits);
// getIndex(fruits)

// function getIndex(fruits) {
//     const fruitFromFruits = prompt('Enter fruit name');
//     const fruitIndex = fruits.findIndex((fruit) => fruit === fruitFromFruits);
//     console.log(fruitIndex===-1 ? 'Fruit not found': `The fruit ${fruitFromFruits} is at index ${fruitIndex}`);
// }

// function getIndex(array, word) {
//     if (!Array.isArray(array)) throw new Error('Input must be an array');
//     if (array.every((wia) => typeof wia !== 'string')) throw new Error('Array must contain only strings');
//     const index = array.findIndex((wia) => wia === word);
//     return index === -1? 'Word not found' : `The word ${word} is at index ${index}`;
// }

// const array = [1,2,3,4]

// console.log(getIndex(array, '2'));
