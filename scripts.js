let click = 0;
let petTimerId;
let waterTimerId;
let feedTimerId;
let cleanTimerId;
let walkTimerId;

function togglePet() {
  const element = document.querySelector("#pet-gif");

  if (getComputedStyle(element).display === "none") {
    click = 0;
    element.style.display = "block";
  }

  click++;

  clearTimeout(petTimerId);

  petTimerId = setTimeout(
    () => {
      element.style.display = "none";
      click = 0;
    },
    1000 + (click - 1) * 250,
  );
}

function feed() {
  const container = document.querySelector("#food-container");

  // Create a new food image
  const food = document.createElement("img");
  food.src = "../images/food.gif";
  food.classList.add("food", "eating");

  food.style.left = `${Math.random() * 40 - 20}px`;
  food.style.top = `${Math.random() * 20 - 10}px`;

  // Add it to the container
  container.appendChild(food);

  // Remove it after the animation finishes
  food.addEventListener(
    "animationend",
    () => {
      food.remove();
    },
    { once: true },
  );
}

function drink() {
  const element = document.querySelector("#drink-gif");

  if (getComputedStyle(element).display === "none") {
    click = 0;
    element.style.display = "block";
  }

  click++;

  clearTimeout(waterTimerId);

  waterTimerId = setTimeout(
    () => {
      element.style.display = "none";
      click = 0;
    },
    2000 + (click - 1) * 500,
  );
}

function clean() {
  const showerElement = document.querySelector("#shower-gif");
  const bubblesElement = document.querySelector("#bubbles-gif");
  const dirtyElement = document.querySelector("#dirt-overlay");

  showerElement.style.display = "block";
  bubblesElement.style.display = "block";

  dirtyElement.classList.add("cleaning");

  clearTimeout(cleanTimerId);

  cleanTimerId = setTimeout(() => {
    showerElement.style.display = "none";
    bubblesElement.style.display = "none";
  }, 5000);
}

const sound = new Audio("../assets/audio/rollin.mp3");
function walk() {
  const rockElement = document.querySelector("#rock");

  rockElement.classList.add("rolling");
  sound.currentTime = 0;

  sound.play();

  clearTimeout(walkTimerId);

  walkTimerId = setTimeout(() => {
    rockElement.classList.remove("rolling");
    sound.pause();
  }, 10000);
}
