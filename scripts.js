let timerId;
let click = 0;
async function togglePet() {
  const element = document.querySelector("#pet-gif");
  if (element.style.display == "none") {
    click = 0;
    element.style.display = "block";

    timerId = setTimeout(() => {
      element.style.display = "none";
    }, 2000);
  }

  if (element.style.display == "block") {
    click += 1;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      element.style.display = "none";
    }, click * 500);
    return;
  }
}
