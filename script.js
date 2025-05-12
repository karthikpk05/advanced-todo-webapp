document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  updateTaskCount();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const tasks = getTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
  input.value = "";
  loadTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <div>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateTaskCount();
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

function clearTasks() {
  localStorage.removeItem("tasks");
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    loadTasks();
  }
}

function updateTaskCount() {
  const count = getTasks().length;
  document.getElementById("taskCount").innerText = `Total Tasks: ${count}`;
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const lis = document.querySelectorAll("#taskList li");

  lis.forEach(li => {
    const taskText = li.querySelector("span").innerText.toLowerCase();
    li.style.display = taskText.includes(query) ? "flex" : "none";
  });
}
