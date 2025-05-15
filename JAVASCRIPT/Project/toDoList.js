document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = ""; // Clear the list before loading

        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a new task item
    function createTaskElement(text, completed = false) {
        const newItem = document.createElement("li");
        
        if (completed) {
            newItem.classList.add("completed");
        }

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = text;

        // Button container
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        // Delete button event
        deleteBtn.addEventListener("click", function () {
            newItem.remove();
            saveTasks();
        });

        // Edit button event
        editBtn.addEventListener("click", function () {
            if (editBtn.textContent === "Save") {
                // Save mode: update the task text
                const editInput = newItem.querySelector("input");
                taskText.textContent = editInput.value;
                newItem.replaceChild(taskText, editInput);
                editBtn.textContent = "Edit";
                saveTasks();
            } else {
                // Edit mode: replace text with input
                const editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = taskText.textContent;
                newItem.replaceChild(editInput, taskText);
                editBtn.textContent = "Save";
            }
        });

        // Append elements
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        newItem.appendChild(taskText);
        newItem.appendChild(btnContainer);
        taskList.appendChild(newItem);
    }

    // Add new task event
    addBtn.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText === "") return;

        createTaskElement(taskText);
        saveTasks(); // Save after adding
        newTaskInput.value = ""; // Clear input
    });

    // Load saved tasks when page loads
    loadTasks();
});