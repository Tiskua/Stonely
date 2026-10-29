const loginButton = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-msg");

usernameInput.addEventListener("input", () => {
  updateLoginButton();
});
passwordInput.addEventListener("input", (event) => {
  errorMessage.textContent = validatePassword(event.target.value);
  updateLoginButton();
});

function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
}

function updateLoginButton() {
  loginButton.disabled =
    !username.value.trim() ||
    !password.value.trim() ||
    errorMessage.textContent != "";
}

loginButton.addEventListener("click", () => {
  window.location.href = "profile.html";
});
