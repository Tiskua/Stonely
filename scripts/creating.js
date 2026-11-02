const loadingContainer = document.getElementById("creation-loading");
const revealContainer = document.getElementById("rock-reveal");
const progressFill = document.getElementById("progress-fill");
const progressPercentage = document.getElementById("progress-percentage");
const loadingMessage = document.getElementById("loading-message");
const progressTrack = document.querySelector(".progress-track");
const rockNameInput = document.getElementById("rock-name");
const continueBtn = document.getElementById("continue-btn");

const duration = 8000;

// Each checkpoint defines the progress at a given time.
const checkpoints = [
  { time: 0, progress: 0, message: "Finding the perfect rock..." },
  { time: 1500, progress: 25, message: "Shaping your new friend..." },
  { time: 3500, progress: 48, message: "Adding some personality..." },
  { time: 5500, progress: 75, message: "Making it extra special..." },
  { time: 7000, progress: 92, message: "Almost ready to meet you!" },
  { time: 8000, progress: 100, message: "Your rock is ready!" },
];

let startTime = null;
let lastMessageIndex = -1;

function animateLoading(timestamp) {
  if (startTime === null) {
    startTime = timestamp;
  }

  const elapsed = Math.min(timestamp - startTime, duration);

  // Find the two checkpoints surrounding the current time.
  let index = 0;

  while (
    index < checkpoints.length - 2 &&
    elapsed >= checkpoints[index + 1].time
  ) {
    index++;
  }

  const current = checkpoints[index];
  const next = checkpoints[index + 1];

  // Interpolate progress between checkpoints.
  const fraction = Math.min(
    (elapsed - current.time) / (next.time - current.time),
    1,
  );

  // Smooth easing between checkpoints.
  const eased = fraction * fraction * (3 - 2 * fraction);

  const progress =
    current.progress + (next.progress - current.progress) * eased;

  const roundedProgress = Math.round(progress);

  progressFill.style.width = `${progress}%`;
  progressPercentage.textContent = `${roundedProgress}%`;
  progressTrack.setAttribute("aria-valuenow", roundedProgress);

  // Update message at each checkpoint.
  const messageIndex = checkpoints.findLastIndex(
    (checkpoint) => elapsed >= checkpoint.time,
  );

  if (messageIndex !== lastMessageIndex) {
    loadingMessage.textContent = checkpoints[messageIndex].message;
    lastMessageIndex = messageIndex;
  }

  if (elapsed < duration) {
    requestAnimationFrame(animateLoading);
  } else {
    revealRock();
  }
}

function revealRock() {
  loadingContainer.hidden = true;
  revealContainer.hidden = false;
}

requestAnimationFrame(animateLoading);
continueBtn.addEventListener("click", () => {
  const rockName = rockNameInput.value.trim();

  if (!rockName) {
    rockNameInput.focus();
    return;
  }

  // Save the rock's name for the next page
  localStorage.setItem("rockName", rockName);

  // Navigate to the main game
  window.location.href = "tabs/homepage.html";
});
