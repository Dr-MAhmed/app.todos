// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load to-do items from localStorage
const savedTodos = JSON.parse(localStorage.getItem('keys')) || [];

// Function to save the to-do items to localStorage
function saveTodos() {
  localStorage.setItem('keys', JSON.stringify(savedTodos));
}

// Function to remove a todo item
function removeTodoItem(task) {
  const index = savedTodos.indexOf(task);
  if (index !== -1) {
    savedTodos.splice(index, 1);
    saveTodos(); // Save the updated to-do items
  }
}

// Create a function to create a new to-do item
function createTodoItem(task) {
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  const taskText = document.createElement('span');
  taskText.classList.add('task');
  taskText.textContent = task;

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete');
  deleteBtn.textContent = 'Delete';

  const hrLine = document.createElement('hr');

  // Function to handle editing and saving the task
  const editTask = () => {
    // Create an input field
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.classList.add('editable-task');
    taskInput.value = task;
    // taskInput.style.width = '80%';

    // Create a save button
    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.textContent = 'Save';

    // Function to handle saving the edited task
    const saveEditedTask = () => {
      const updatedTask = taskInput.value;
      taskText.textContent = updatedTask; // Update innerHTML

      // Update the task in savedTodos array and localStorage
      const index = savedTodos.indexOf(task);
      if (index !== -1) {
        savedTodos[index] = updatedTask;
        saveTodos(); // Save the updated to-do items
      }

      // Remove the input field and save button
      taskContainer.removeChild(taskInput);
      taskContainer.removeChild(saveBtn);
      taskText.style.display = 'inline-block'; // Show the task text
    };

    // Add event listener to the save button
    saveBtn.addEventListener('click', saveEditedTask);

    // Hide the task text and append the input field and save button
    taskText.style.display = 'none';
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(saveBtn);
  };

  // Add event listener to the task text for editing
  taskText.addEventListener('click', editTask);

  // Add event listener to the delete button
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(todoItem); // Remove the todo item from the innerHTML
    removeTodoItem(task); // Remove the todo item from the savedTodos array and localStorage
    todoList.removeChild(hrLine); // Remove the hr line
  });

  taskContainer.appendChild(taskText);

  todoItem.appendChild(checkbox);
  todoItem.appendChild(taskContainer);
  todoItem.appendChild(deleteBtn);
  todoList.appendChild(todoItem);
  todoList.appendChild(hrLine);

  savedTodos.push(task);
  saveTodos(); // Save the updated to-do items
}

// Load the saved to-do items when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//   savedTodos.forEach((task) => {
//     createTodoItem(task);
//   });
// });

// Handle form submission
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = todoInput.value.trim();

  if (task !== '') {
    createTodoItem(task);
    todoInput.value = '';
  }
});

// Handle checking/unchecking of tasks
todoList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});
