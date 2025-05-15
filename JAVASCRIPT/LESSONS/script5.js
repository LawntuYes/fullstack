function setTask(task) {
    console.log(currentTask===null ? "מטלה חדשה הוגדרה": "מטלה חדשה הוגדרה, הקודמת נמחקה");
    currentTask = task

}

function showTask() {
    console.log(currentTask===null ? "אין מטלה מוגדרת": currentTask);
}

function clearTask() {
    currentTask = null
    console.log("המטלה נמחקה");
}

let currentTask = null
setTask(prompt("Enter the task:")) //sets the first task
setTask(prompt("What the fuck is this task i wont do it")) //sets another task so that the output is different
showTask() //shows the task
clearTask() //clears the task
console.log(currentTask);

function processArray(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]));
    }

    return result;

}

const double = n => n * 2
const add = n => n + 2
const numbers = [1,2,3,4]
console.log(processArray(numbers, add));
console.log(processArray(numbers, double)); //

