function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "./../index.html";
}

document.querySelector(".log-out-btn").addEventListener("click", logout);
