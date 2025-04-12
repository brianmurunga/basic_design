// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const darkToggle = document.getElementById('darkToggle');
const navLinksAll = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');
const logoutBtn = document.getElementById('logoutBtn');

// Todo List Elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// State
let todos = [];
let editTodoId = null;

// Initialize the dashboard
function initDashboard() {
  setupEventListeners();
  switchPage('home');
}

// Set up all event listeners
function setupEventListeners() {
  // Menu toggle
  menuToggle?.addEventListener('click', toggleMenu);
  
  // Dark mode toggle
  darkToggle?.addEventListener('click', toggleDarkMode);
  
  // Navigation links
  navLinksAll.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage(link.dataset.page);
    });
  });
  
  // Todo list functionality
  addTodoBtn?.addEventListener('click', addTodo);
  todoInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  
  // Logout button
  logoutBtn?.addEventListener('click', logout);
}

// Toggle mobile menu
function toggleMenu() {
  navLinks.classList.toggle('active');
}

// Toggle dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  darkToggle.innerHTML = html.dataset.theme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Switch between pages
function switchPage(page) {
  // Update active nav link
  navLinksAll.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  
  // Show/hide page content
  pageContents.forEach(content => {
    content.classList.toggle('hidden', content.id !== `${page}-page`);
  });
  
  // Close mobile menu if open
  navLinks.classList.remove('active');
}

// Todo List Functions
function addTodo() {
  const todoText = todoInput.value.trim();
  if (!todoText) return;
  
  if (editTodoId !== null) {
    // Update existing todo
    todos = todos.map(todo => 
      todo.id === editTodoId ? { ...todo, text: todoText } : todo
    );
    editTodoId = null;
    addTodoBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
  } else {
    // Add new todo
    const newTodo = {
      id: Date.now(),
      text: todoText
    };
    todos.push(newTodo);
  }
  
  todoInput.value = '';
  renderTodos();
}

function editTodo(id) {
  const todoToEdit = todos.find(todo => todo.id === id);
  if (todoToEdit) {
    todoInput.value = todoToEdit.text;
    todoInput.focus();
    editTodoId = id;
    addTodoBtn.innerHTML = '<i class="fas fa-save"></i> Save';
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  if (editTodoId === id) {
    editTodoId = null;
    todoInput.value = '';
    addTodoBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
  }
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <div class="todo-actions">
        <button class="edit-btn" onclick="editTodo(${todo.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    todoList.appendChild(todoItem);
  });
}

// Logout function
function logout() {
  alert("Logging out...");
  window.location.href = "index.html";
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);