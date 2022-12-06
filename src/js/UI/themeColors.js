const userTheme = localStorage.getItem("theme");
const systemPrefrence = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export function checkTheme() {
  if (userTheme === "dark" || (!userTheme && systemPrefrence)) {
    document.documentElement.classList.add("dark");

    return;
  }
}
checkTheme();
