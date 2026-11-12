import { cosmetics } from "../cosmetics/cosmetics-data.js";

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

const rockElement = document.querySelector("#rock-container");

// Attributes about rock
const storedHappiness = localStorage.getItem("happiness_level");

let happiness = storedHappiness !== null ? Number(storedHappiness) : 100;

if (!Number.isFinite(happiness)) {
  happiness = 100;
}
const stored_dirtiness = localStorage.getItem("dirtiness_level");
let dirtinessLevel = parseInt(stored_dirtiness, 10) ?? 0;
dirtinessOverlay.style.opacity = dirtinessLevel / 100;

// Get the name of the rock
const rockNameTitle = document.querySelector("#rock-name");

const rockName = localStorage.getItem("rockName");
if (rockName) {
  rockNameTitle.textContent = rockName;
}

// DEATH SCREEN
const deathOverlay = document.getElementById("death-background");
const restartButton = document.getElementById("restart-btn");

restartButton.addEventListener("click", () => {
  window.location.href = "/index.html";
});

// Pet Animation
function togglePet() {
  if (!actionsEnabled) return;
  if (getComputedStyle(petGif).display === "none") {
    clickCount = 0;
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
  updateHappiness(0.5);

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
      updateHappiness(1 * clickCount);

      clickCount = 0;
    },
    1000 + (clickCount - 1) * 100,
  );
  updateDirtiness(4, 6);
}

//Clean animation
function clean() {
  if (!actionsEnabled) return;

  showerElement.style.display = "block";
  bubblesElement.style.display = "block";

  clearTimeout(cleanTimerId);

  cleanTimerId = setTimeout(() => {
    showerElement.style.display = "none";
    bubblesElement.style.display = "none";

    updateHappiness(20);
    resetDirtiness();
  }, 5000);
}

//Walk Animation
const sound = new Audio("../assets/audio/rollin.mp3");
function walk() {
  if (!actionsEnabled) return;

  rockElement.classList.add("rolling");

  actionsEnabled = false;

  sound.currentTime = 0;
  sound.play();

  clearTimeout(walkTimerId);

  walkTimerId = setTimeout(() => {
    rockElement.classList.remove("rolling");

    sound.pause();
    actionsEnabled = true;
    updateHappiness(20);
  }, 10000);
  updateDirtiness(10, 20);
}

function slingshot() {
  if (!actionsEnabled) return;

  const slingshot = document.querySelector("#slingshot");
  const launch = document.querySelector("#launch");

  actionsEnabled = false;

  slingshot.style.display = "block";

  setTimeout(() => {
    slingshot.style.display = "none";
    launch.style.display = "block";

    setTimeout(() => {
      launch.style.display = "none";
      slingshot.style.display = "block";

      rockElement.classList.remove("launch");
      void rockElement.offsetWidth;

      rockElement.classList.add("launch");

      rockElement.addEventListener(
        "animationend",
        () => {
          rockElement.classList.remove("launch");

          slingshot.style.display = "none";
          launch.style.display = "none";
          updateDirtiness(30, 40);
          updateHappiness(-20);

          actionsEnabled = true;
        },
        { once: true },
      );
    }, 400);
  }, 500);
}

// Happiness bar logic
const happinessCover = document.querySelector(".happiness-bar-cover");

function decreaseHappinessBar() {
  clearInterval(barTimerId);

  barTimerId = setInterval(() => {
    if (happiness <= 0) {
      deathOverlay.style.display = "flex";
      clearInterval(barTimerId);
      return;
    }
    updateHappiness(-0.5);

    happinessCover.style.width = `${100 - Math.min(100, happiness)}%`;
  }, 1000);
}

decreaseHappinessBar();

function renderCosmetics() {
  const overlay = document.getElementById("cosmetic-overlay");

  const selectedCosmetics = JSON.parse(
    localStorage.getItem("selectedCosmetics") || "{}",
  );

  overlay.replaceChildren();

  cosmetics.forEach((cosmetic) => {
    if (selectedCosmetics[cosmetic.category] !== cosmetic.id) {
      return;
    }

    const img = document.createElement("img");
    img.src = cosmetic.image;
    img.alt = cosmetic.name;
    img.className = "cosmetic-image";

    img.style.left = `calc(50% + ${cosmetic.x}px)`;
    img.style.top = `calc(50% + ${cosmetic.y}px)`;
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = `${cosmetic.width ?? 100}px`;
    img.style.height = `${cosmetic.height ?? 100}px`;
    overlay.appendChild(img);
  });
}

renderCosmetics();

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

  localStorage.setItem("dirtiness_level", dirtinessLevel);
}

function updateHappiness(value) {
  happiness = Math.max(0, Math.min(100, happiness + value));

  localStorage.setItem("happiness_level", happiness);

  updateHappinessBar();
}

function updateHappinessBar() {
  happinessCover.style.width = `${100 - happiness}%`;
}

updateHappinessBar();
decreaseHappinessBar();

window.feed = feed;
window.drink = drink;
window.togglePet = togglePet;
window.walk = walk;
window.clean = clean;
window.slingshot = slingshot;
