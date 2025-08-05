// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Step 1: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Load Tasks from Local Storage
    loadTasks();

    // Step 3: Define the addTask Function
    function addTask(taskText, save = true) {
        // If taskText was not passed (i.e., user is adding manually), get it from input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Do not add empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // Use className, not classList.add

        // Handle task removal (from DOM and localStorage)
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save to Local Storage if not part of initial load
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Step 4: Define a function to remove a task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task to be removed
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Step 5: Define a function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // Pass false to prevent duplicate saving
        });
    }

    // Step 6: Attach Event Listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
