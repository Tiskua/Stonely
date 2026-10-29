const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("user");

console.log("User id", userId);

const persontitle = document.querySelector(".person-title");
persontitle.textContent = userId;

const textarea = document.querySelector(".chat-toolbar textarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const messagesContainer = document.querySelector(".messages");
const input = document.querySelector("#chat-input");
const sendBtn = document.querySelector("#send-btn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage("Person", message);
  if (userId == "Rok AI") {
    await sleep(getRandomIntInclusive(1000, 3000));

    const AIMessage =
      rockResponses[getRandomIntInclusive(0, rockResponses.length - 1)];
    addMessage("Rok AI", AIMessage);
  }

  input.value = "";
  input.style.height = "auto";

  // Scroll to the newest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(person, message) {
  const isAi = person == "Rok AI";
  const side = isAi ? "left" : "right";

  const messageHTML = `
    <div class="message-container ${side}">
      ${
        side === "left"
          ? isAi
            ? '<img src="/images/rok-logo.png" class="profile-image" />'
            : '<img src="/images/default-profile.png" class="profile-image" />'
          : ""
      }

      <div class="bubble">
        <div class="chat-text"></div>
        <div class="chat-person"></div>
      </div>

      ${
        side === "right"
          ? '<img src="/images/default-profile.png" class="profile-image" />'
          : ""
      }
    </div>
  `;

  messagesContainer.insertAdjacentHTML("beforeend", messageHTML);

  const newMessage = messagesContainer.lastElementChild;

  newMessage.querySelector(".chat-text").textContent = message;
  newMessage.querySelector(".chat-person").textContent = person;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rockResponses = [
  "I am Rock.",
  "I AM ROCK!",
  "I am rock?",
  "I... am Rock.",
  "I am... ROCK!",
  "I AM... ROCK!!!",
  "i am rock...",
  "I am Rock :)",
  "I am Rock :(",
  "I am Rock <3",
  "I AM ROCK?!",
  "I. AM. ROCK.",
  "I am Rooooock!",
  "I am... rock?",
  "I AM ROCK!!!",
  "I am rock~",
  "I am Rock!!",
  "I am... Rock...",
  "I AM ROCK >:(",
  "I am Rock :D",
  "I am rock :/",
  "I am ROCK?!?",
  "I... AM... ROCK!",
  "I am Rock...",
  "I AM ROOOOCK!!!",
  "I am rock.",
  "I am Rock?!",
  "I am... rock!",
  "I AM ROCK.",
  "I am Rock :P",
];
