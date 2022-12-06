import { checkTheme } from "./themeColors.js";
checkTheme();

const darkModeIcon = document.querySelector(".dark-mode");
const lightModeIcon = document.querySelector(".light-mode");

if (localStorage.getItem("theme") === "dark") {
  lightModeIcon.classList.add("hidden");
}

function toggleMode() {
  darkModeIcon.classList.toggle("hidden");
  lightModeIcon.classList.toggle("hidden");
  checkTheme();
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
