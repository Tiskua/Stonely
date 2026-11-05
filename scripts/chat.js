const personContainers = document.querySelectorAll(".person-container");

personContainers.forEach((container) => {
  container.addEventListener("click", (_) => {
    const person = container.querySelector(".person");
    const name = person.textContent;
    window.location.href = `/chatmessage.html?user=${encodeURIComponent(name)}`;
  });
});
