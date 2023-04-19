const main = () => {
    const form = document.querySelector("#form");
    const taskInput = document.querySelector("#task-input");
    const taskList = document.querySelector("#task-list");
    const emptyList = document.querySelector("#empty-list");

    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTask);
    taskList.addEventListener("click", doneTask);

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value;

        const taskHTML = `
        <li class="list-group-item">
                <span class="task-title">${taskText}</span>
            <div>
                <button type="button" data-action="done" class="btn-done item-buttons">Done</button>
                <button type="button" data-action="delete" class="btn-delete item-buttons">Delete</button>
            </div>
        </li>`;

        taskList.insertAdjacentHTML("beforeend", taskHTML);

        taskInput.value = "";
        taskInput.focus();

        if (taskList.children.length > 1) {
            emptyList.classList.add("none");
        }
    }

    function deleteTask(e) {
        if (e.target.dataset.action !== "delete") {
            return
        }

        const parenNode = e.target.closest(".list-group-item");
        parenNode.remove();
        if (taskList.children.length === 1) {
            emptyList.classList.remove("none");
        }

    }

    function doneTask(e) {
        if (e.target.dataset.action !== "done") {
            return
        }

        const parenNode = e.target.closest(".list-group-item");
        const taskTitle = parenNode.querySelector(".task-title");
        taskTitle.classList.toggle("done");

    }
};

export default main;