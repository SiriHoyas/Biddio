const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollTopBtn.classList.remove("hidden");
    scrollTopBtn.classList.add("flex");
  } else {
    scrollTopBtn.classList.add("hidden");
    scrollTopBtn.classList.remove("flex");
  }
});

scrollTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});
