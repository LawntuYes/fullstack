const title = document.getElementById("title");
// const changeTitle = document.getElementById("changeTitle");
let click1 = false

// changeTitle.addEventListener('click', ()=>{
//     title.classList.toggle("title")
//     if (!click1) {
//         title.textContent = "fuck you"
//         click1 = true
//     }
//     else {
//         title.textContent = "Welcome!"
//         click1 = false
//     }
// });

//second 
function change() {
    title.classList.toggle("title")
    if (!click1) {
        title.textContent = "fuck you"
        click1 = true
    }
    else {
        title.textContent = "Welcome!"
        click1 = false
    }
}

function addLi () {

    const list = document.getElementById("listItem")
    const nextNumber = list.children.length + 1;
    const newItem = document.createElement("li")
    newItem.textContent = nextNumber
    list.appendChild(newItem)
}

