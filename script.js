let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        if (
            currentFilter === "active" && task.completed ||
            currentFilter === "completed" && !task.completed
        ) return;

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <button onclick="toggleTask(${index})">Done</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

renderTasks();
