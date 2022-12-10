import { checkTheme } from "./themeColors.mjs";
checkTheme();

const darkModeIcon = document.querySelector(".dark-mode");
const lightModeIcon = document.querySelector(".light-mode");
console.log(localStorage.getItem("theme"));

if (localStorage.getItem("theme") === "dark") {
  lightModeIcon.classList.add("hidden");
  darkModeIcon.classList.remove("hidden");
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
