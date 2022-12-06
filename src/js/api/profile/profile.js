import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";
import { convertEndtime } from "../../time/convertEndtime.mjs";

const profileInfoContainer = document.querySelector(".profile-info");
const myListingsContainer = document.querySelector(".my-listings");
const myListingsBtn = document.querySelector(".my-listings-btn");
const myBidsBtn = document.querySelector(".my-bids-btn");

const { accessToken, userName, userCredits, userAvatar } = getLocalStorage();
console.log(userName, userAvatar, userCredits);

profileInfoContainer.innerHTML = `
    <div class="profile-info flex items-center">
        <img src="${userAvatar}" alt="profile image of ${userName}" onerror="this.src = './src/img/placeholder.png';" class="w-8 h-8 rounded-full"/>
        <p class="ml-4 font-mainFont dark:text-offWhite">Hello, ${userName}!</p>
    </div>`;

const profileOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-type": "application/json; charset=UTF-8",
  },
};

async function getUserListings() {
  const response = await fetchContent(
    `/profiles/${userName}/listings?_seller=true&_bids=true`,
    profileOptions
  );
  const json = await response.json();
  myListingsContainer.innerHTML = "";

  json.forEach((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");
    const { date, month, year, hours, minutes, seconds } = convertEndtime(
      listing.endsAt
    );

    document.querySelector(".my-listings-container").innerHTML += listingsHTML(
      listing.media,
      listing.title,
      listing.seller.name,
      date,
      month,
      year,
      hours,
      minutes,
      seconds,
      bid.amount ? bid.amount : bid,
      listing.id
    );
  });
}

async function getUserBids() {
  myListingsContainer.innerHTML = "";
  const response = await fetchContent(
    `/profiles/${userName}/bids`,
    profileOptions
  );
  const json = await response.json();
  if (json.length >= 1) {
    json.forEach((listing) => {
      myListingsContainer.innerHTML += listingsHTML(
        listing.media,
        listing.title,
        listing.seller.name,
        listing.endsAt,
        listing.bids,
        listing.id
      );
    });
  } else {
    myListingsContainer.innerHTML = `
    <p class="font-mainFont mb-4">You have no active bids!</p>
    
    <a href="./listings.html" class="register bg-secondaryPurple font-mainFont text-offWhite text-xs px-2 py-1 mb-4 rounded-sm">Browse listings</a>`;
  }
}

myListingsBtn.addEventListener("click", getUserListings);
myBidsBtn.addEventListener("click", getUserBids);
getUserListings();

// Display section if user goes to profile page without being logged in

if (!accessToken) {
  const profileInfoMain = document.querySelector(".profile-info-main");
  profileInfoMain.classList.add("hidden");
  const userFeedback = document.querySelector(".no-user-container");
  userFeedback.classList.add("flex");
  userFeedback.classList.remove("hidden");
}
