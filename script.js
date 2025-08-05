// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If no taskText provided, get it from input field
        if (typeof taskText === 'boolean') {
            save = taskText;
            taskText = taskInput.value.trim();
        } else if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }

        // Check if task text is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add click event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };

        // Append remove button to list item
        li.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(li);

        // Save to Local Storage if specified
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add event listener to Add Task button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Add event listener for Enter key press on input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});