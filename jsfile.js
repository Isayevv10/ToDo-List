
let formList = document.querySelector('#formList');
let inputValue = document.querySelector('#inputValue');
let submitBtn = document.querySelector('.submitBtn');
let listItem = document.querySelector('.listItem');
let sign = document.querySelector('#sign');
let ulList = document.querySelector('.ulList');
let clearBtn = document.querySelector('#clearBtn');


playAllEvents();
function playAllEvents() {
    formList.addEventListener("submit",getItem);
    submitBtn.addEventListener('submit',addItem);
    listItem.addEventListener('click',deleteToDo);
    inputValue.addEventListener('keyup',filterToDo);
    clearBtn.addEventListener('click',clearAllToDos);
    document.addEventListener('DOMContentLoaded',loadAllItemToUI);
};

 function loadAllItemToUI() {

    let todos = getTodosFromStorage();
    todos.forEach(e => {
        addItem(e);
    });
};

function getItem(e) {

    let value = inputValue.value.trim();
    if (value!=="") {
        addItem(value);
        addTodosToStorage(value);
    }

    e.preventDefault();
}

function addItem(value) {   
    
    ulList.innerHTML += `<li class="liElement">${value}<a><i class="fa fa-trash" aria-hidden="true"></i></a></li>`;
    formList.reset();
}

function getTodosFromStorage() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function addTodosToStorage(value) {

    todos = getTodosFromStorage();

    todos.push(value);
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

function deleteToDo(e) {
    console.log(e.target);

    if (e.target.className === 'fa fa-trash') {
        e.target.parentElement.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
    }
}

function deleteToDoFromStorage(deleteItem) {
    let todos = getTodosFromStorage();
    todos.forEach( (e,index) => {
        if(e === deleteItem) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem('todos',JSON.stringify(todos));
}

function filterToDo(e) {

    let filterValue = e.target.value.toLowerCase();
    let getLiElements = document.querySelectorAll('.liElement');

    getLiElements.forEach(e => {
        const text = e.textContent.toLowerCase();

        if ( text.indexOf(filterValue) === -1 ) {
            e.style.display = 'none';
            // e.setAttribute('style','display : none');

        } else {
            // e.setAttribute('style','display : block');
            e.style.display = 'block';
        }
    })
}

function clearAllToDos(e) {
    if(confirm("Do you want to clear all tasks ?")) {
        while (ulList.firstElementChild != null) {
            ulList.removeChild(ulList.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}