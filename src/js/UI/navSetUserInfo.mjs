import { getLocalStorage } from "../components/getLocalstorage.mjs";

const userInfoContainer = document.querySelector(".user");
const loginBtnContainer = document.querySelector(".login-register");

const { accessToken, userName, userCredits, userAvatar } = getLocalStorage();

function displayUserInfo() {
  document.querySelector(".user-name").innerHTML = userName;
  if (userAvatar) {
    document.querySelector(
      ".user-avatar"
    ).innerHTML = `<img src="${userAvatar}" alt="${userName} user avatar image" onerror="this.src = './src/img/profile-placeholder.png';" class="w-8 h-8 rounded-full" />`;
  } else {
    document.querySelector(
      ".user-avatar"
    ).innerHTML = `<img src="./src/img/profile-placeholder.png" alt="${userName} user avatar image"  class="w-8 h-8 rounded-full" />`;
  }
}

function displayUserCredits() {
  const userAvatarContainer = document.querySelector(".user-credits");

  if (userCredits === "1") {
    userAvatarContainer.innerHTML = `${userCredits} Credit`;
  } else if (userCredits === "0") {
    userAvatarContainer.innerHTML = `No credits`;
  } else {
    userAvatarContainer.innerHTML = `${userCredits} Credits`;
  }
}

displayUserInfo();
displayUserCredits();

const profileBtn = document.querySelector(".menu-item-profile");

function showUserInfo() {
  if (accessToken) {
    loginBtnContainer.classList.add("hidden");
    loginBtnContainer.classList.remove("flex");
    userInfoContainer.classList.remove("hidden");
    profileBtn.classList.remove("hidden");
  } else {
    loginBtnContainer.classList.remove("hidden");
    loginBtnContainer.classList.add("flex");
    userInfoContainer.classList.add("hidden");
  }
}

showUserInfo();
