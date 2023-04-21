const main = () => {
    const form = document.querySelector("#form");
    const taskInput = document.querySelector("#task-input");
    const taskList = document.querySelector("#task-list");
    const emptyList = document.querySelector("#empty-list");

    let tasks = [];

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((task) => renderTask(task));
    }
    

    checkEmptyList();

    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTask);
    taskList.addEventListener("click", doneTask);

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value;

        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false,
        };

        tasks.push(newTask);

        saveToLocalStorage();

        renderTask(newTask);
        
        taskInput.value = "";
        taskInput.focus();

        checkEmptyList();
    }

    function deleteTask(e) {
        if (e.target.dataset.action !== "delete") {
            return
        }

        const parenNode = e.target.closest(".list-group-item");
        const id = Number(parenNode.id);
        
        tasks = tasks.filter((task) => task.id !== id);

        saveToLocalStorage();

        parenNode.remove();

        checkEmptyList();
    }

    function doneTask(e) {
        if (e.target.dataset.action !== "done") {
            return
        }

        const parenNode = e.target.closest(".list-group-item");

        const id = Number(parenNode.id);
        const task = tasks.find((task) => task.id === id);
        task.done = !task.done;

        saveToLocalStorage();

        const taskTitle = parenNode.querySelector(".task-title");
        taskTitle.classList.toggle("done");

    }

    function checkEmptyList() {
        if (tasks.length === 0) {
            const emptyListHTML = `<li class="list-group-item">
            <div id="empty-list" class="empty-text">To-do list is empty</div>
        </li>`;

        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
        }

        if (tasks.length > 0) {
            const emptyListElement = document.querySelector('#empty-list');
            emptyListElement ? emptyListElement.remove() : null;

        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {
        const cssClass = task.done ? "task-title done" : "task-title";

        const taskHTML = `
        <li id="${task.id}" class="list-group-item">
                <span class="${cssClass}">${task.text}</span>
            <div>
                <button type="button" data-action="done" class="btn-done item-buttons">Done</button>
                <button type="button" data-action="delete" class="btn-delete item-buttons">Delete</button>
            </div>
        </li>`;

        taskList.insertAdjacentHTML("beforeend", taskHTML);


    }
};

export default main;