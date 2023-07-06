let btnAddTaskEl = document.querySelector("button");
let taskNameEl = document.querySelector("#content");
let btnFilter = document.querySelectorAll(".btn-value");
let btnDeleteCompleted = document.querySelector(".btn-delete_completed");

let btnFilterAll = btnFilter[0];
let btnFilterActive = btnFilter[1];
let btnFilterCompleted = btnFilter[2];

let tasks = getTaskFromLocalStorage();

renderTasks(tasks);

taskNameEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (!taskNameEl.value) {
      alert("Vui lòng nhập tên công việc");
      return false;
    } else {
      let task = { name: taskNameEl.value, status: "active" };

      tasks.push(task);
      taskNameEl.value = "";

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    }
  }
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

btnFilterAll.addEventListener("click", function () {
  currentFilter = "all";
  activateFilterButton(currentFilter);
  renderTasks(tasks);
});

btnFilterActive.addEventListener("click", function () {
  currentFilter = "active";
  activateFilterButton(currentFilter);
  const taskFiltered = tasks.filter((item) => item.status === 'active');
  renderTasks(taskFiltered);
});

btnFilterCompleted.addEventListener("click", function () {
  currentFilter = "completed";
  activateFilterButton(currentFilter);
  const taskFiltered = tasks.filter((item) => item.status === "completed");
  renderTasks(taskFiltered);
});

function deleteTask(id) {
  if (confirm("Xóa công việc?")) {
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
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

  // Gắn sự kiện cho các checkbox mới
  let checkboxElements = document.querySelectorAll(
    '#result input[type="checkbox"]'
  );
 
  checkboxElements.forEach(function (checkbox, index) {
    checkbox.addEventListener("change", function () {
      tasks[index].status =
        tasks[index].status === "completed" ? "active" : "completed";
       
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });
  });

  // const btnCompletedAll = document.querySelector('.btn-completedAll');
  // btnCompletedAll.addEventListener('click', function(){
  //   checkboxElements.forEach(function(checkbox,index){
  //     checkbox.checked = true;
  //     tasks[index].status = 'completed';
  //   });
  
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   renderTasks(tasks);
  // });

  const countItemCompleted = document.querySelector(".count-itemCompleted")
  let countItemCompletedValue = 0;

  let addClassTaskname = document.querySelectorAll(".task-name");
  addClassTaskname.forEach(function (taskElement, index) {
    if (tasks[index].status === "completed") {
      taskElement.classList.add("text-completed");
      countItemCompletedValue++;
    }
  });

  countItemCompleted.textContent = `Item Completed : ${countItemCompletedValue}`;
  
  let editTaskElement = document.querySelectorAll(".task-name");
editTaskElement.forEach(function (taskElement, index) {
  taskElement.addEventListener("dblclick", function () {
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
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

btnDeleteCompleted.addEventListener("click", function () {
  let activeTask = tasks.filter(function (task) {
    return task.status !== "completed";
  });
  tasks = activeTask;
  localStorage.setItem("tasks", JSON.stringify(activeTask));
  renderTasks(activeTask);
});


