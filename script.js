const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const togglePassword = document.getElementById('togglePassword');
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

if (email && password && loginBtn) {
  email.addEventListener('input', validateForm);
  password.addEventListener('input', validateForm);
}

function validateForm() {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const passwordValid = password.value.length > 8;
  loginBtn.disabled = !(emailValid && passwordValid);
}

// Toggle password visibility
togglePassword?.addEventListener('click', () => {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  togglePassword.classList.toggle('fa-eye-slash');
});

// Simulate login with loading effect
loginForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  // Disable form inputs and show loader
  loginBtn.disabled = true;
  loginBtn.querySelector('.btn-text').style.display = 'none';
  loginBtn.querySelector('.btn-loader').style.display = 'inline-block';

  setTimeout(() => {
    loginStatus.textContent = "✅ Login successful!";
    
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }, 1500);
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
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
  
    document.getElementById('taskList').appendChild(li);
    input.value = '';
  
    showToast("✅ Task added!");
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
  

  // Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  