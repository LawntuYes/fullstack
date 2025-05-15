const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
const combinedArr = [...arr, ...arr2]
// console.log(combinedArr);

const arr4 = [5, 6, 7]
const arr3 = [3, 4,...arr4, 8, 9]
// console.log(arr3);
const copyArr = [...arr]
copyArr[0] = 100//if you try to copy
console.log(arr); //doesnt copy


const obj1 = {a: 1, b:2}
const obj2 = {c:3, d:4}

const mergedObj = {...obj1, ...obj2}

console.log(mergedObj);

const copyObj = {...obj1}
copyObj.a = 100

console.log(obj1); //doesnt copy

function add(...shawarma) {//kind of a dynamic function (...args)
    return shawarma.reduce((acc, curr) => acc + curr, 0)
}
console.log(add(2, 45,4 ,3 ,42,34, 4,3,42));

const user = {
    name: "Misha",
    username: "Lawntu",
    age: 18,
    address: {
        city: "Be'er Sheva"
    },
    grades: [90, 75, 100, 40]
}

// const copyUser = {...user}// copy user, if you dont use the {...} it will copy the reference
// copyUser.grades[0] = 70

console.log(user); //doesnt copy but copies nested objects

//1
// const copyUser = JSON.parse(JSON.stringify(user))//deep copy
//2
const copyUser = structuredClone(user)

copyUser.grades[0] = 70

console.log(user); //still copies but copies nested objects

//1
// Object.assign(user, {ID: 1});
//2
// user.ID = 1
//3
// user['id'] = 1
//4
const newObj = {...user, ID: 1}
console.log(user);