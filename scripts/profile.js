const questions = [
  {
    key: "age",
    title: "How old are you?",
    subtitle: "First, a little about you.",
    type: "number",
  },
  {
    key: "energy",
    title: "What's your energy like?",
    subtitle: "Choose what describes you best.",
    options: [
      {
        value: "low",
        title: "Low-key",
        description: "I like taking it easy",
      },
      {
        value: "balanced",
        title: "Balanced",
        description: "A little bit of everything",
      },
      {
        value: "high",
        title: "High energy",
        description: "Always on the move",
      },
    ],
  },
  {
    key: "social",
    title: "How social are you?",
    subtitle: "Everyone has their own social style.",
    options: [
      {
        value: "low",
        title: "Lone wolf",
        description: "I enjoy my own company",
      },
      {
        value: "small",
        title: "Small circle",
        description: "A few close friends",
      },
      {
        value: "high",
        title: "Social butterfly",
        description: "The more, the merrier",
      },
    ],
  },
  {
    key: "weekend",
    title: "What's your ideal weekend?",
    subtitle: "Pick how you'd most like to spend it.",
    options: [
      {
        value: "new",
        title: "Explore something new",
      },
      {
        value: "friends",
        title: "Hang out with friends",
      },
      {
        value: "hobby",
        title: "Work on a hobby or project",
      },
    ],
  },

  {
    key: "matters",
    title: "What matters most to you?",
    subtitle: "What do you value most in life?",
    options: [
      {
        value: "friendship",
        title: "Friendship",
      },
      {
        value: "adventure",
        title: "Adventure and new experiences",
      },
      {
        value: "peace",
        title: "Peace and stability",
      },
      {
        value: "creativity",
        title: "Creativity and self-expression",
      },
      {
        value: "learning",
        title: "Learning and personal growth",
      },
    ],
  },
  {
    key: "unexpected",
    title: "How do you handle unexpected situations?",
    subtitle: "Life doesn't always go according to plan.",
    options: [
      {
        value: "flow",
        title: "Go with the flow",
      },
      {
        value: "plan",
        title: "Make a plan",
      },
      {
        value: "panic",
        title: "Panic a little (but figure it out)",
      },
      {
        value: "chaos",
        title: "Embrace the chaos",
      },
    ],
  },

  {
    key: "environment",
    title: "Where would your rock feel at home?",
    subtitle: "Choose the perfect place for your rock.",
    type: "environment",
    options: [
      {
        value: "forest",
        title: "Forest",
        image: "../images/rock-forest.webp",
      },
      {
        value: "beach",
        title: "Beach",
        image: "../images/rock-beach.jpg",
      },
      {
        value: "mountains",
        title: "Mountains",
        image: "../images/rock-mountain.webp",
      },
      {
        value: "desert",
        title: "Desert",
        image: "../images/rock-desert.webp",
      },
    ],
  },
];

let currentStep = 0;

const profile = {
  age: null,
  energy: "balanced",
  social: null,
  weekend: null,
  matters: null,
  unexpected: null,
  environment: null,
};

const title = document.querySelector("#question-title");
const subtitle = document.querySelector("#question-subtitle");
const container = document.querySelector("#answer-container");
const stepCount = document.querySelector("#step-count");
const progressFill = document.querySelector("#progress-fill");
const backBtn = document.querySelector("#back-btn");
const nextBtn = document.querySelector("#next-btn");

function renderQuestion() {
  const question = questions[currentStep];

  title.textContent = question.title;
  subtitle.textContent = question.subtitle;

  stepCount.textContent = `${currentStep + 1} / ${questions.length}`;

  progressFill.style.width = `${((currentStep + 1) / questions.length) * 100}%`;

  backBtn.hidden = currentStep === 0;

  nextBtn.textContent =
    currentStep === questions.length - 1 ? "Finish →" : "Continue →";

  container.replaceChildren();

  if (question.type === "number") {
    renderAgeInput(question);
  } else if (question.type === "environment") {
    renderEnvironment(question);
  } else {
    renderOptions(question);
  }

  updateNextButton();
}

function renderAgeInput(question) {
  const input = document.createElement("input");

  input.type = "number";
  input.className = "age-input";
  input.placeholder = "Enter your age";
  input.min = "1";
  input.max = "120";
  input.step = "1";
  input.value = profile.age ?? "";

  input.addEventListener("input", () => {
    profile.age = input.value === "" ? null : Number(input.value);

    updateNextButton();
  });

  container.appendChild(input);
}

function renderOptions(question) {
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";

    const info = document.createElement("span");
    info.className = "answer-info";

    const optionTitle = document.createElement("span");
    optionTitle.className = "answer-title";
    optionTitle.textContent = option.title;
    info.appendChild(optionTitle);

    if (option.description) {
      const description = document.createElement("span");
      description.className = "answer-description";
      description.textContent = option.description;
      info.appendChild(description);
    }

    const circle = document.createElement("span");
    circle.className = "answer-circle";
    circle.setAttribute("aria-hidden", "true");

    button.append(info, circle);

    const selected = profile[question.key] === option.value;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));

    button.addEventListener("click", () => {
      profile[question.key] = option.value;
      renderQuestion();
    });

    container.appendChild(button);
  });
}

function renderEnvironment(question) {
  const grid = document.createElement("div");
  grid.className = "environment-grid";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "environment-option";

    const img = document.createElement("img");
    img.src = option.image;
    img.alt = option.title;

    const label = document.createElement("span");
    label.textContent = option.title;

    button.append(img, label);

    const selected = profile[question.key] === option.value;

    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));

    button.addEventListener("click", () => {
      profile[question.key] = option.value;
      renderQuestion();
    });

    grid.appendChild(button);
  });

  container.appendChild(grid);
}

function updateNextButton() {
  const question = questions[currentStep];
  const value = profile[question.key];

  if (question.key === "age") {
    nextBtn.disabled = !Number.isInteger(value) || value < 1 || value > 120;
  } else {
    nextBtn.disabled = value === null;
  }
}

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (nextBtn.disabled) return;

  if (currentStep < questions.length - 1) {
    currentStep++;
    renderQuestion();
  } else {
    finishProfile();
  }
});

function finishProfile() {
  sessionStorage.setItem("stonely-profile", JSON.stringify(profile));

  console.log("Profile created:", profile);

  // Navigate to the next screen
  window.location.href = "home.html";
}

renderQuestion();
