// Theme Management Functions
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function initializeTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);
  
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }
}

// Login Form Functions
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const togglePassword = document.getElementById('togglePassword');
  const loginStatus = document.getElementById('loginStatus');

  // Real-time validation
  loginForm.addEventListener('input', validateForm);

  // Password visibility toggle
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      if (loginStatus) {
        loginStatus.textContent = 'Please fix the errors in the form';
        loginStatus.style.color = 'red';
      }
      return;
    }

    // Show loading state
    if (loginBtn) loginBtn.disabled = true;
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'block';
    if (loginStatus) {
      loginStatus.textContent = 'Logging in...';
      loginStatus.style.color = '#333';
    }

    // Simulate API call
    setTimeout(() => {
      if (btnText) btnText.style.display = 'block';
      if (btnLoader) btnLoader.style.display = 'none';
      window.location.href = 'dashboard.html';
    }, 1500);
  });

  // Signup link
  const signupLink = document.getElementById('signupLink');
  if (signupLink) {
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      const wipMessage = document.getElementById('wipMessage');
      if (wipMessage) {
        wipMessage.style.display = 'block';
        wipMessage.textContent = 'Sign up feature is coming soon!';
        setTimeout(() => {
          wipMessage.style.display = 'none';
        }, 3000);
      }
    });
  }

  // Validation helper
  function validateForm() {
    const emailValid = validateEmail(emailInput.value);
    const passwordValid = passwordInput.value.length > 8;
    
    if (loginBtn) {
      loginBtn.disabled = !(emailValid && passwordValid);
    }
    
    return emailValid && passwordValid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Task Management Functions
function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-buttons">
      <button onclick="editTask(this)"><i class="fas fa-edit"></i></button>
      <button onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button>
    </div>
  `;

  const taskList = document.getElementById('taskList');
  if (taskList) {
    taskList.appendChild(li);
    input.value = '';
    showToast("✅ Task added!");
  }
}

function editTask(button) {
  const taskItem = button.closest('li');
  const span = taskItem.querySelector('.task-text');
  const newText = prompt("Edit your task:", span.textContent);

  if (newText !== null && newText.trim() !== '') {
    span.textContent = newText.trim();
    showToast("✏️ Task updated!");
  }
}

function deleteTask(button) {
  const taskItem = button.closest('li');
  taskItem.style.animation = 'fadeOut 0.3s forwards';

  setTimeout(() => {
    taskItem.remove();
    showToast("🗑️ Task deleted!");
  }, 300);
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  setupLoginForm();
  
  // Initialize task-related theme toggle if it exists
  const taskThemeToggle = document.getElementById("theme-toggle");
  if (taskThemeToggle) {
    taskThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});