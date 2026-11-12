const cosmetics = [
  {
    id: "top-hat",
    name: "Top Hat",
    image: "../images/cosmetics/hat/top-hat.png",
    category: "Head",
    x: 0,
    y: -20,
  },
  {
    id: "baseball-cap",
    name: "Baseball Cap",
    image: "../images/cosmetics/hat/baseball-cap.png",
    category: "Head",
    x: 0,
    y: -15,
  },
  {
    id: "glasses",
    name: "Glasses",
    image: "../images/cosmetics/eyes/glasses.png",
    category: "Eyes",
    x: 0,
    y: 5,
  },
  {
    id: "necklace",
    name: "Necklace",
    image: "../images/cosmetics/neck/necklace.png",
    category: "Neck",
    x: 0,
    y: 25,
  },
];

const selectedCosmetics = JSON.parse(
  localStorage.getItem("selectedCosmetics") || "{}",
);
const categories = ["Head", "Neck", "Eyes"];

const container = document.getElementById("cosmetics-container");

categories.forEach((category) => {
  // Find all cosmetics belonging to this category
  const items = cosmetics.filter((cosmetic) => cosmetic.category === category);

  // Create category container
  const section = document.createElement("div");
  section.className = "cosmetic-container";

  // Create category title
  const title = document.createElement("h3");
  title.textContent = category;

  // Create items list
  const list = document.createElement("ul");
  list.className = "items-container";

  items.forEach((cosmetic) => {
    const item = document.createElement("li");
    item.className = "item";
    item.dataset.id = cosmetic.id;

    const img = document.createElement("img");
    img.src = cosmetic.image;
    img.alt = cosmetic.name;

    item.appendChild(img);
    list.appendChild(item);

    item.addEventListener("click", () => {
      selectCosmetic(cosmetic);
    });
  });

  section.appendChild(title);
  section.appendChild(list);
  container.appendChild(section);
});

function selectCosmetic(cosmetic) {
  const { id, category } = cosmetic;

  // Deselect if already equipped
  if (selectedCosmetics[category] === id) {
    delete selectedCosmetics[category];
  } else {
    selectedCosmetics[category] = id;
  }

  // Save selections
  localStorage.setItem("selectedCosmetics", JSON.stringify(selectedCosmetics));

  updateSelectedCosmetics();
}

function updateSelectedCosmetics() {
  document.querySelectorAll(".items-container .item").forEach((item) => {
    const cosmetic = cosmetics.find((c) => c.id === item.dataset.id);

    if (!cosmetic) return;

    const isSelected = selectedCosmetics[cosmetic.category] === cosmetic.id;

    item.classList.toggle("selected", isSelected);
  });
}

updateSelectedCosmetics();
