const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const tasksContainer = document.getElementById("tasks");
const totalTasks = document.getElementById("totalTasks");
const allButton = document.getElementById("allButton");
const completedButton = document.getElementById("completedButton");
const uncompletedButton = document.getElementById("uncompletedButton");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const completeAllButton = document.getElementById("completeAllButton");

let todos = [];

addButton.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    todos.push({ text: taskText, completed: false });
    renderTasks();
    todoInput.value = "";
  }
});

function renderTasks() {
  tasksContainer.innerHTML = "";
  todos.forEach((todo, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (todo.completed) {
      taskElement.classList.add("completed");
    }
    taskElement.innerHTML = `
      <input type="checkbox" class="circle-checkbox" data-index="${index}" ${
      todo.completed ? "checked" : ""
    }>
      <span>${todo.text}</span>
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
  totalTasks.textContent = `Total tasks: ${todos.length}`;
}

tasksContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("checkbox")) {
    const index = target.getAttribute("data-index");
    todos[index].completed = !todos[index].completed;
    renderTasks();
  } else if (target.classList.contains("deleteButton")) {
    const index = target.getAttribute("data-index");
    todos.splice(index, 1);
    renderTasks();
  }
});

allButton.addEventListener("click", () => {
  renderTasks();
});

completedButton.addEventListener("click", () => {
  const completedTodos = todos.filter((todo) => todo.completed);
  tasksContainer.innerHTML = "";
  completedTodos.forEach((todo, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task", "completed");
    taskElement.textContent = todo.text;
    tasksContainer.appendChild(taskElement);
  });
  totalTasks.textContent = `Total tasks: ${completedTodos.length}`;
});

uncompletedButton.addEventListener("click", () => {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  tasksContainer.innerHTML = "";
  uncompletedTodos.forEach((todo, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.textContent = todo.text;
    tasksContainer.appendChild(taskElement);
  });
  totalTasks.textContent = `Total tasks: ${uncompletedTodos.length}`;
});

clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTasks();
});

completeAllButton.addEventListener("click", () => {
  todos.forEach((todo) => {
    todo.completed = true;
  });
  renderTasks();
});

renderTasks();
