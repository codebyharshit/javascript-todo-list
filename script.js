const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

class Storage {
    static addToStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage() {
        let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}

let todoArr = Storage.getStorage();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    console.log(id);
    const todo = new Todo(id, input.value);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    UI.removeTodo();
    Storage.addToStorage(todoArr);
});


class Todo { 
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}

class UI{
    static displayData() {
        let displayData = todoArr.map((item) => {
            return `
            <div class="todo">
            <p>${item.todo}</p>    
            <span class="remove" data-id = ${item.id} >🗑️</span>
            </div>
            `
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = ""
    }
    static removeTodo(){
        lists.addEventListener("click", (e) => {
             if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
             }
             let btnId = e.target.dataset.id;
             UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addToStorage(todoArr);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});


