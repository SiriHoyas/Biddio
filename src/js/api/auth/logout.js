function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userAvatar");
  localStorage.removeItem("userCredits");
  window.location.href = "./../index.html";
}

document.querySelector(".log-out-btn").addEventListener("click", logout);
