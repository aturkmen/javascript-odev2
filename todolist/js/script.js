// Task List
const taskListDOM = document.querySelector("#list");

const closeTaskButton = `
    <button onclick="deleteTask(this)" type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
`;

// Get and print tasks from local storage
let tasks = localStorage.getItem("tasks").split(",");
tasks.forEach(addNewTask);
console.log(tasks);

// Checks and adds a new list item
function newElement() {
    let newTaskDOM = document.querySelector("#task");
    if (newTaskDOM.value.trim()) {
        addNewTask(newTaskDOM.value);
        tasks.push(newTaskDOM.value);
        localStorage.setItem("tasks", tasks);        
        $('#toastAdded').toast('show');
    } else {
        $('#toastError').toast('show');
    }
    newTaskDOM.value = "";
}

// Adds new list item
function addNewTask(newTaskText) {
    if (newTaskText) {
        let newTask = document.createElement("li");
        newTask.classList.add("list-group-item", "pl-5");
        newTask.addEventListener("click", doneTask);
        newTask.innerHTML = newTaskText + closeTaskButton;
        taskListDOM.appendChild(newTask);
    }
}

// Deletes a list item
function deleteTask(item) {
    // Get task name
    let taskDOM = item.parentElement;
    taskDOM.removeChild(item);
    let taskName = taskDOM.innerText; // task name    
    // remove task from local storage
    tasks.pop(taskName);
    localStorage.setItem("tasks", tasks);

    taskListDOM.removeChild(taskDOM); // remove task from list
}

// Done a task
function doneTask() {
    this.classList.toggle("checked");
}