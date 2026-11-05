// All the timers
let petTimerId;
let clickCount = 0;
let waterTimerId;
let feedTimerId;
let cleanTimerId;
let walkTimerId;
let slingshotTimerID;
let barTimerId;

let actionsEnabled = true;

// Animation Elements
const dirtinessOverlay = document.querySelector("#dirt-overlay");
const foodContainer = document.querySelector("#food-container");
const petGif = document.querySelector("#pet-gif");
const drinkGif = document.querySelector("#drink-gif");
const showerElement = document.querySelector("#shower-gif");
const bubblesElement = document.querySelector("#bubbles-gif");

const rockElement = document.querySelector("#rock");

// Attributes about rock
const stored_happiness = localStorage.getItem("happiness_level");
let happiness = parseFloat(stored_happiness, 10) ?? 100;

const stored_dirtiness = localStorage.getItem("dirtiness_level");
let dirtinessLevel = parseInt(stored_dirtiness, 10) ?? 0;
dirtinessOverlay.style.opacity = dirtinessLevel / 100;

// Get the name of the rock
const rockNameTitle = document.querySelector("#rock-name");

const rockName = localStorage.getItem("rockName");
if (rockName) {
  rockNameTitle.textContent = rockName;
}

// Pet Animation
function togglePet() {
  if (getComputedStyle(petGif).display === "none") {
    petCount = 0;
    petGif.style.display = "block";
  }

  clickCount++;

  clearTimeout(petTimerId);

  petTimerId = setTimeout(
    () => {
      petGif.style.display = "none";
      clickCount = 0;
      updateHappiness(1);
    },
    1000 + (clickCount - 1) * 250,
  );
}

//Feed animation
function feed() {
  if (!actionsEnabled) return;

  const food = document.createElement("img");
  food.src = "../images/food.gif";
  food.classList.add("food", "eating");

  food.style.left = `${Math.random() * 40 - 20}px`;
  food.style.top = `${Math.random() * 20 - 10}px`;

  foodContainer.appendChild(food);

  updateDirtiness(1, 3);

  // Remove after the animation finishes
  food.addEventListener(
    "animationend",
    () => {
      food.remove();
    },
    { once: true },
  );
}

//Drink Animation
function drink() {
  if (!actionsEnabled) return;

  if (getComputedStyle(drinkGif).display === "none") {
    clickCount = 0;
    drinkGif.style.display = "block";
  }

  clickCount++;

  clearTimeout(waterTimerId);

  waterTimerId = setTimeout(
    () => {
      drinkGif.style.display = "none";
      clickCount = 0;
      updateHappiness(3);
    },
    2000 + (clickCount - 1) * 500,
  );
  updateDirtiness(4, 6);
}

//Clean animation
function clean() {
  if (!actionsEnabled) return;

  showerElement.style.display = "block";
  bubblesElement.style.display = "block";
  dirtinessOverlay.classList.add("cleaning");

  clearTimeout(cleanTimerId);

  cleanTimerId = setTimeout(() => {
    showerElement.style.display = "none";
    bubblesElement.style.display = "none";
    dirtinessOverlay.classList.remove("cleaning");

    updateHappiness(30);
    resetDirtiness();
  }, 5000);
}

//Walk Animation
const sound = new Audio("../assets/audio/rollin.mp3");
function walk() {
  if (!actionsEnabled) return;

  rockElement.classList.add("rolling");
  dirtinessOverlay.classList.add("rolling");

  actionsEnabled = false;

  sound.currentTime = 0;
  sound.play();

  clearTimeout(walkTimerId);

  walkTimerId = setTimeout(() => {
    rockElement.classList.remove("rolling");
    dirtinessOverlay.classList.remove("rolling");
    sound.pause();
    actionsEnabled = true;
    updateHappiness(20);
  }, 10000);
  updateDirtiness(10, 20);
}

//Sling shot animation
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

// Happiness bar logic
const happinessCover = document.querySelector(".happiness-bar-cover");

function decreaseHappinessBar() {
  clearInterval(barTimerId);

  barTimerId = setInterval(() => {
    if (happiness <= 0) {
      clearInterval(barTimerId);
      return;
    }
    updateHappiness(-0.1);

    happinessCover.style.width = `${100 - Math.min(100, happiness)}%`;
  }, 1000);
}

decreaseHappinessBar();

// Util functions
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetDirtiness() {
  dirtinessLevel = 0;
  dirtinessOverlay.style.opacity = 0;
  localStorage.setItem("dirtiness_level", 0);
}
function updateDirtiness(min, max) {
  dirtinessLevel = dirtinessLevel + getRandomIntInclusive(min, max);
  dirtinessOverlay.style.opacity = dirtinessLevel / 100;
  console.log(dirtinessLevel);
  localStorage.setItem("dirtiness_level", dirtinessLevel);
}

function updateHappiness(value) {
  happiness += value;
  localStorage.setItem("happiness_level", happiness);
}
