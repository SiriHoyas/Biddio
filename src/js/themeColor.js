const darkModeIcon = document.querySelector(".dark-mode");
const lightModeIcon = document.querySelector(".light-mode");

const userTheme = localStorage.getItem("theme");
const systemPrefrence = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

function toggleMode() {
  darkModeIcon.classList.toggle("hidden");
  lightModeIcon.classList.toggle("hidden");
}

function checkTheme() {
  if (userTheme === "dark" || (!userTheme && systemPrefrence)) {
    document.documentElement.classList.add("dark");
    darkModeIcon.classList.add("hidden");
    return;
  }
  lightModeIcon.classList.add("hidden");
}

function switchTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    toggleMode();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  toggleMode();
}

lightModeIcon.addEventListener("click", switchTheme);
darkModeIcon.addEventListener("click", switchTheme);
checkTheme();
