const addPhotosBtn = document.querySelector(".open-modal");
const doneAdding = document.querySelector(".done-btn");
const modal = document.querySelector(".add-img-modal");

addPhotosBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

doneAdding.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
