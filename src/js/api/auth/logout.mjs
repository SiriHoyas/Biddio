import { logout } from "../../components/removeLocalStorage.js";

document.querySelector(".log-out-btn").addEventListener("click", () => {
  logout();
  window.location.href = "./index.html";
});
