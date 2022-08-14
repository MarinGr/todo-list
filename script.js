const container = document.querySelector(".container");
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");
let todos;
const checkedTodo = `<i class="fa-solid fa-square-check completed-todo check-icon"></i>`;
const uncheckedTodo = `<i class="fa-regular fa-square uncompleted-todo check-icon"></i>`;

document.addEventListener("DOMContentLoaded", getTodos);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && todoInput.value != "") {
    e.preventDefault();
    addBtn.click();
  }
});

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const todoDesc = todoInput.value;
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  todo = {
    text: todoDesc,
    complete: false,
  };

  todoItem.innerHTML = `
  <i class="fa-regular fa-square uncompleted-todo check-icon"></i>
  <p class="todo-desc">${todoDesc}</p>
  <i class="fa-regular fa-trash-can delete-icon"></i>
`;

  todoList.appendChild(todoItem);
  saveTodoToLocal(todo);
  todoInput.value = "";
}

function saveTodoToLocal(todo) {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

container.addEventListener("click", deleteTodo);

function deleteTodo(e) {
  if (e.target.classList.contains("delete-icon")) {
    const todoItem = e.target.parentElement;
    todoItem.remove();
    const todoDesc = todoItem.querySelector(".todo-desc").innerText;
    removeTodoFromLocal(todoDesc);
  }
}

function removeTodoFromLocal(todoDesc) {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo, index) => {
    if (todo.text == todoDesc) {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

container.addEventListener("click", completeTodo);

function completeTodo(e) {
  if (e.target.classList.contains("check-icon")) {
    const icon = e.target;
    const todoItem = icon.parentElement;
    const todoText = todoItem.querySelector(".todo-desc");
    const todoDesc = todoItem.querySelector(".todo-desc").innerText;
    let complete;

    if (icon.classList.contains("uncompleted-todo")) {
      icon.classList.add("fa-solid", "fa-square-check", "completed-todo");
      icon.classList.remove("fa-regular", "fa-square", "uncompleted-todo");
      todoText.classList.add("line-through");
      complete = true;
    } else {
      icon.classList.remove("fa-solid", "fa-square-check", "completed-todo");
      icon.classList.add("fa-regular", "fa-square", "uncompleted-todo");
      todoText.classList.remove("line-through");
      complete = false;
    }

    updateTodosLocal(todoDesc, complete);
  }
}

function updateTodosLocal(todoDesc, complete) {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    if (todo.text == todoDesc) {
      todo.complete = complete;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => item.remove());
  localStorage.clear();
  document.location.reload();
}

function getTodos() {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    if (todo.complete == true) {
      checkIconValue = checkedTodo;
      lineTroughText = "line-through";
    } else {
      checkIconValue = uncheckedTodo;
      lineTroughText = "";
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
  ${checkIconValue}
  <p class="todo-desc ${lineTroughText}">${todo.text}</p>
  <i class="fa-regular fa-trash-can delete-icon"></i>
`;
    todoList.appendChild(todoItem);
  });
}
