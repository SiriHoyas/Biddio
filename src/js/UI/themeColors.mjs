const userTheme = localStorage.getItem("theme");
const systemPrefrence = window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Checks if the system prefrence of the user is set to dark, or the user has
 * used the toggle button on profile site to set the theme.
 */
export function checkTheme() {
  if (userTheme === "dark" || (!userTheme && systemPrefrence)) {
    document.documentElement.classList.add("dark");
    return;
  }
  document.documentElement.classList.remove("dark");
}
checkTheme();
