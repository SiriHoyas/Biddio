import { checkTheme } from "./themeColors.mjs";
checkTheme();

const darkModeIcon = document.querySelector(".dark-mode");
const lightModeIcon = document.querySelector(".light-mode");

if (localStorage.getItem("theme") === "dark") {
  lightModeIcon.classList.add("hidden");
  darkModeIcon.classList.remove("hidden");
}

function switchTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    darkModeIcon.classList.add("hidden");
    lightModeIcon.classList.remove("hidden");

    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  lightModeIcon.classList.add("hidden");
  darkModeIcon.classList.remove("hidden");
}

lightModeIcon.addEventListener("click", switchTheme);
darkModeIcon.addEventListener("click", switchTheme);
