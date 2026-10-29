let click = 0;
let petTimerId;
let waterTimerId;
let feedTimerId;
let cleanTimerId;
let walkTimerId;
let dirtinessLevel = 0;
let slingshotTimerID;

let actionsEnabled = true;

let happiness = 100;
let barTimerId;

const dirtinessOverlay = document.querySelector("#dirt-overlay");

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
      happiness += 1;
    },
    1000 + (click - 1) * 250,
  );
}

function feed() {
  if (!actionsEnabled) {
    return;
  }
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
  updateDirtiness(5, 8);
}

function drink() {
  if (!actionsEnabled) {
    return;
  }
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
      happiness += 3;
    },
    2000 + (click - 1) * 500,
  );
  updateDirtiness(4, 6);
}

function clean() {
  if (!actionsEnabled) {
    return;
  }
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
    happiness = 100;
  }, 5000);
}

const sound = new Audio("../assets/audio/rollin.mp3");
function walk() {
  if (!actionsEnabled) {
    return;
  }
  const rockElement = document.querySelector("#rock");

  rockElement.classList.add("rolling");
  dirtinessOverlay.classList.add("rolling");
  sound.currentTime = 0;
  actionsEnabled = false;

  sound.play();

  clearTimeout(walkTimerId);

  walkTimerId = setTimeout(() => {
    rockElement.classList.remove("rolling");
    dirtinessOverlay.classList.remove("rolling");
    sound.pause();
    actionsEnabled = true;
    happiness += 20;
  }, 10000);
  updateDirtiness(10, 20);
}

function slingshot() {
  if (!actionsEnabled) {
    return;
  }
  const slingshot = document.querySelector("#slingshot");
  const launch = document.querySelector("#launch");

  slingshot.style.display = "block";
  //launch.style.display = "block";

  //show slingshot

  //show launch slingshot | hide slingshot
  //make rock png bigger

  //hide launch slingshot
  //show slingshot
  //play rock animation as he disappears into the distance
}

/* 
Every so often, the happinenss bar decreases slightly
Doing an action increases his happiness by a certain amount
An action will also cause his dirtiness factor to increase


*/
const happinessCover = document.querySelector(".happiness-bar-cover");

function decreaseHappinessBar() {
  clearInterval(barTimerId);

  barTimerId = setInterval(() => {
    if (happiness <= 0) {
      clearInterval(barTimerId);
      return;
    }

    happiness -= 0.1;
    happinessCover.style.width = `${100 - Math.min(100, happiness)}%`;
  }, 50);
}

decreaseHappinessBar();

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateDirtiness(min, max) {
  dirtinessLevel = dirtinessLevel + getRandomIntInclusive(min, max);
  dirtinessOverlay.style.opacity = dirtinessLevel / 100;
  console.log("Opacity", dirtinessOverlay.style.opacity);
}
