let btnAddTaskEl = document.querySelector("button");
let taskNameEl = document.querySelector("#content");
let btnFilter = document.querySelectorAll(".btn-value");
let btnDeleteCompleted = document.querySelector('.btn-delete_completed')

let btnFilterAll = btnFilter[0];
let btnFilterActive = btnFilter[1];
let btnFilterCompleted = btnFilter[2];

let tasks = getTaskFromLocalStorage();

renderTasks(tasks);

btnAddTaskEl.addEventListener("click", function () {
  if (!taskNameEl.value) {
    alert("Vui long nhap ten cong viec");
    return false;
  }

  let taskId = this.getAttribute("id");
  let tasks = getTaskFromLocalStorage();
  let task = { name: taskNameEl.value, status: "active" };

  tasks.push(task);

  taskNameEl.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
});

var currentFilter = "all";

function activateFilterButton(filter) {
  btnFilterAll.classList.remove("active");
  btnFilterActive.classList.remove("active");
  btnFilterCompleted.classList.remove("active");

  if (filter === "all") {
    btnFilterAll.classList.add("active");
  } else if (filter === "active") {
    btnFilterActive.classList.add("active");
  } else if (filter === "completed") {
    btnFilterCompleted.classList.add("active");
  }
}

btnFilterAll.addEventListener("click", function (e) {
  currentFilter = "all";
  activateFilterButton(currentFilter);
  let tasks = getTaskFromLocalStorage();
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
});

btnFilterActive.addEventListener("click", function (e) {
  currentFilter = "active";
  activateFilterButton(currentFilter);
  let tasks = getTaskFromLocalStorage();
  const status = e.target.value;

  const taskFilted = tasks.filter((item) => item.status === status);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(taskFilted);
});

btnFilterCompleted.addEventListener("click", function (e) {
  currentFilter = "completed";
  activateFilterButton(currentFilter);
  let tasks = getTaskFromLocalStorage();
  const status = e.target.value;

  const taskFilted = tasks.filter((item) => item.status === status);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(taskFilted);
});

function deleteTask(id) {
  if (confirm("Delete?")) {
    let tasks = getTaskFromLocalStorage();
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(getTaskFromLocalStorage());
  }
}

function renderTasks(tasks) {
  let content = "<ul>";
  if (tasks.length > 0) {
    tasks.forEach((task, index) => {
      content += `<li class='list-checkbox'>
        <input type="checkbox" class="input-checked" ${
          task.status === "completed" ? "checked" : ""
        } />
        <span class="checkmark"></span>
        <div class='task-name'>${task.name}</div> 
         
         <a href='#' onclick="deleteTask(${index})">Delete</a>
       </li>`;
    });
  } else {
    content = `<span class='display-nontask'>Non Task!</span>`;
  }
  content += "</ul>";

  document.querySelector("#result").innerHTML = content;
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

let checkboxElements = document.querySelectorAll(
  '#result input[type="checkbox"]'
);


checkboxElements.forEach(function (checkbox, index) {
    const tasks = getTaskFromLocalStorage();
  checkbox.addEventListener("change", function (event) {
      tasks[index].status =
      tasks[index].status === "completed" ? "active" : "completed";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });
});

const textCompleted = editTaskElement.forEach(function (taskElement, index) {
    const tasks =getTaskFromLocalStorage()
    if (tasks[index].status === "completed") {
        taskElement.classList.add("text-completed");
  }
});

let editTaskElement = document.querySelectorAll(".task-name");

editTaskElement.forEach(function (taskElement, index) {
  taskElement.addEventListener("dblclick", function (event) {
    const tasks = getTaskFromLocalStorage();
    const input = document.createElement("input");
    input.value = tasks[index].name;
    input.classList.add("inputText");

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        tasks[index].name = input.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(tasks);
      }
    });

    taskElement.replaceWith(input);
    input.focus();
  });
});

btnDeleteCompleted.addEventListener('click', function(e){
  let tasks = getTaskFromLocalStorage();
  let activeTask = tasks.filter(function(task){
    return task.status !=='completed'

  })
  localStorage.setItem('tasks', JSON.stringify(activeTask))
  renderTasks(activeTask)
})