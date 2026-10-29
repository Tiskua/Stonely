const personContainers = document.querySelectorAll(".person-container");

personContainers.forEach((container, index) => {
  container.addEventListener("click", (event) => {
    const userid = container.dataset.userid;
    console.log(userid);
    window.location.href = `/chatmessage.html?user=${encodeURIComponent(userid)}`;
  });
});
