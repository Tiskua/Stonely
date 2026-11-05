const loginButton = document.getElementById("login-btn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-msg");

loginButton.addEventListener("click", () => {
  if (!username.value.trim() || !password.value.trim()) {
    errorMessage.textContent = "Please fill in both fields";
    return;
  }
  window.location.href = "tabs/homepage.html";
});
