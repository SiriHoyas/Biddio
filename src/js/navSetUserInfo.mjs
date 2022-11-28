import { getLocalStorage } from "./components/getLocalstorage.mjs";

const { userName, userCredits, userAvatar } = getLocalStorage();

function displayUserInfo() {
  document.querySelector(".user-name").innerHTML = userName;
  if (userAvatar !== "null") {
    document.querySelector(
      ".user-avatar"
    ).innerHTML = `<img src="${userAvatar}" alt="${userName} user avatar image" class="w-8 h-8 rounded-full" />`;
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
