import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { fetchCredits } from "./fetchCredits.mjs";
import { getUserBids } from "./getUserBids.mjs";
import { getUserListings } from "./getUserListings.mjs";

const profileInfoContainer = document.querySelector(".profile-info");
const myListingsContainer = document.querySelector(".my-listings");
const myListingsBtn = document.querySelector(".my-listings-btn");
const myBidsBtn = document.querySelector(".my-bids-btn");

const { accessToken, userName, userAvatar } = getLocalStorage();
fetchCredits(accessToken, userName);

profileInfoContainer.innerHTML = `
    <div class="profile-info flex items-center">
        <img data-cy="profile-image" src="${userAvatar}" alt="profile image of ${userName}" onerror="this.src = './src/img/profile-placeholder.png';" class="w-10 h-10 rounded-full"/>
        <p class="ml-4 font-mainFont text-lg dark:text-offWhite">Hello, ${userName}!</p>
    </div>`;

const profileOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-type": "application/json; charset=UTF-8",
  },
};

getUserListings(userName, profileOptions, myListingsContainer);

myListingsBtn.addEventListener("click", () => {
  getUserListings(userName, profileOptions, myListingsContainer);
  myListingsBtn.classList.add("underline");
  myBidsBtn.classList.remove("underline");
});
myBidsBtn.addEventListener("click", () => {
  getUserBids(userName, profileOptions, myListingsContainer);
  myListingsBtn.classList.remove("underline");
  myBidsBtn.classList.add("underline");
});

// Display section if user goes to profile page without being logged in

if (!accessToken) {
  const profileInfoMain = document.querySelector(".profile-info-main");
  profileInfoMain.classList.add("hidden");
  const userFeedback = document.querySelector(".no-user-container");
  userFeedback.classList.add("flex");
  userFeedback.classList.remove("hidden");
}

const currentTime = new Date();
console.log(currentTime);
