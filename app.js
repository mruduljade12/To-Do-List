//nav section initialize
const allTodos = document.getElementById('all');
const activeTodos = document.getElementById('active');
const completedTodos = document.getElementById('completed');

//ul initialization
const all_todo_ul = document.getElementById('all_todos');
const active_todo_ul = document.getElementById('active_todos');
const completed_todo_ul = document.getElementById('completed_todos');


//buttons initialization
const addTaskBTN = document.getElementById('addTaskBTN');
const clearAllBTN = document.getElementById('clearAllBTN'); 9
const addBTN = document.getElementById('addBTN');
const cancelBTN = document.getElementById('cancelBTN');


//html containers initialization
const addTaskSection = document.getElementById('addTaskSection');


//inputs
const taskInput = document.getElementById('taskInput');


all_render();


//navigation applications
allTodos.addEventListener('click', (event) => {
    event.preventDefault();

    all_todo_ul.style.display = 'flex';
    active_todo_ul.style.display = 'none';
    completed_todo_ul.style.display = 'none';

    all_render();
});

activeTodos.addEventListener('click', (event) => {
    event.preventDefault();

    all_todo_ul.style.display = 'none';
    active_todo_ul.style.display = 'flex';
    completed_todo_ul.style.display = 'none';

    active_render();
});

completedTodos.addEventListener('click', (event) => {
    event.preventDefault();

    all_todo_ul.style.display = 'none';
    active_todo_ul.style.display = 'none';
    completed_todo_ul.style.display = 'flex';

    completed_render();
});


//button applications
addTaskBTN.addEventListener('click', (event) => {
    event.preventDefault();

    addTaskSection.style.display = 'flex';
});

clearAllBTN.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();

    all_render();
    completed_render();
    active_render();
});

addBTN.addEventListener('click', (event) => {
    event.preventDefault();

    let input = taskInput.value;
    let object = {
        title: input,
        isCompleted: false
    };

    let taskArray = JSON.parse(localStorage.getItem('todos')) || [];
    taskArray.push(object);

    localStorage.setItem('todos', JSON.stringify(taskArray));

    taskInput.value = '';
    addTaskSection.style.display = 'none';

    all_render();
});

cancelBTN.addEventListener('click', (event) => {
    event.preventDefault();

    addTaskSection.style.display = 'none';
});


//render functions
//all render
function all_render() {
    all_todo_ul.innerHTML = '';
    let localStorageArray = JSON.parse(localStorage.getItem('todos')) || [];

    localStorageArray.forEach((element, index) => {
        let li = document.createElement('li');
        let checkbox = document.createElement('input');
        let span = document.createElement('span');
        let button = document.createElement('button');

        checkbox.type = 'checkbox';
        checkbox.checked = element.isCompleted;
        span.textContent = element.title;
        button.textContent = "Delete";

        checkbox.addEventListener('change', () => {
            let task = JSON.parse(localStorage.getItem('todos')) || [];
            task[index].isCompleted = checkbox.checked;

            localStorage.setItem('todos', JSON.stringify(task));

            all_render();
            active_render();
            completed_render();
        });

        button.addEventListener('click', () => {
            let task = JSON.parse(localStorage.getItem('todos')) || [];
            task.splice(index, 1);

            localStorage.setItem('todos', JSON.stringify(task));

            all_render();
            active_render();
            completed_render();
        });

        if (element.isCompleted) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);

        all_todo_ul.appendChild(li);
    });
}

//complete render
function completed_render() {
    completed_todo_ul.innerHTML = '';

    let task = JSON.parse(localStorage.getItem('todos')) || [];
    let completed_todos = task.filter(todo => todo.isCompleted);

    completed_todos.forEach(element => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = element.title;
        li.appendChild(span);
        completed_todo_ul.appendChild(li);
    });
}


//active render
function active_render() {
    active_todo_ul.innerHTML = '';

    let task = JSON.parse(localStorage.getItem('todos')) || [];
    let active_todos = task.filter(todo => !todo.isCompleted);

    active_todos.forEach(element => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = element.title;
        li.appendChild(span);
        active_todo_ul.appendChild(li);
    });
}
