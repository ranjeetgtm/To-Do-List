document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            addTask(taskValue);
            taskInput.value = ''; // Clear input field
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const taskValue = taskInput.value.trim();
            if (taskValue) {
                addTask(taskValue);
                taskInput.value = ''; // Clear input field
            }
        }
    });

    // Function to create and add a task
    function addTask(taskValue) {
        const li = document.createElement('li');
        li.textContent = taskValue;

        // Toggle completion status on click
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the click event on <li>
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            // Toggle completion status on click
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the click event on <li>
                li.remove();
                saveTasks();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
});
