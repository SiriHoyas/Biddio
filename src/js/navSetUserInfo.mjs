import { getLocalStorage } from "./components/getLocalstorage.mjs";

const { userName, userCredits, userAvatar } = getLocalStorage();
console.log(userName, userCredits, userAvatar);

document.querySelector(
  ".user-avatar"
).innerHTML = `<img src="${userAvatar}" alt="${userName} user avatar image" class="w-8 h-8 rounded-full" />`;
document.querySelector(".user-name").innerHTML = userName;
document.querySelector(".user-credits").innerHTML = `${userCredits} Credits`;
