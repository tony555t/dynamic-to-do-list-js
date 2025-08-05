
document.addEventListener('DOMContentLoaded', function () {

    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    loadTasks();

   
    function addTask(taskText, save = true) {
        
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // add empty tasks
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

        // Handle task removal 
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

    // remove a task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task to be removed
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // Pass false to prevent duplicate saving
        });
    }

    // Attach Event Listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
