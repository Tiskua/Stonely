const createButton = document.getElementById("create-btn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-msg");

usernameInput.addEventListener("input", () => {
  updateCreateButton();
});
passwordInput.addEventListener("input", (event) => {
  errorMessage.textContent = validatePassword(event.target.value);
  updateCreateButton();
});

function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
}

function updateCreateButton() {
  createButton.disabled =
    !username.value.trim() ||
    !password.value.trim() ||
    errorMessage.textContent != "";
}

createButton.addEventListener("click", () => {
  window.location.href = "/profile/profile.html";
});
