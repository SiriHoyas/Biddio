document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".navbar-middle").classList.toggle("hidden");
  document.querySelector(".navbar-right").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("overflow-hidden");
  document.querySelector(".menu-open-modal").classList.toggle("hidden");
});
