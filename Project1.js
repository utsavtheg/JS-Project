let todos = [];

const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const totalTodos = document.querySelector("#totalTodos");

function addTodo() {
    const todoText = todoInput.value.trim();

    if(todoText === '') {
        alert("Please Enter a Task");
        return;
    }

    todos.push(todoText);
    
    todoInput.value = '';
    renderTodo();
}

function deleteTodo(index) {    
    todos.splice(index, 1);
    renderTodo();
}

function renderTodo() {

    todoList.innerHTML = '';

    if(todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">No tasks yet. Add one above!</div>
        `;
        totalTodos.textContent = "Total tasks: 0";
        return;
    }

    todos.forEach((todo, index)=>{
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        todoItem.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn" data-index=${index}>Delete</button>
        `;
        todoList.append(todoItem);

    });

    totalTodos.textContent = `Total tasks: ${todos.length}`;
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e)=>{
    if(e.key === 'Enter') {
        addTodo();
    }
    
});

todoList.addEventListener("click", (e)=>{
    
    if(e.target.classList.contains("delete-btn")) {
        const index = Number(e.target.dataset.index);        
        deleteTodo(index);
    }
    
})

renderTodo();