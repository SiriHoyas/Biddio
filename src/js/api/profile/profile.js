import { fetchContent } from "../../components/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

const profileInfoContainer = document.querySelector(".profile-info-container");
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
  myListingsContainer.innerHTML = "";
  const response = await fetchContent(
    `/profiles/${userName}/listings?_seller=true`,
    profileOptions
  );
  const json = await response.json();

  json.map((listing) => {
    return (myListingsContainer.innerHTML += listingsHTML(
      listing.media,
      listing.title,
      listing.seller.name,
      listing.endsAt,
      listing.bids,
      listing.id
    ));
  });
}

getUserListings();

async function getUserBids() {
  myListingsContainer.innerHTML = "";
  const response = await fetchContent(
    `/profiles/${userName}/bids`,
    profileOptions
  );
  const json = await response.json();
  if (json.length >= 1) {
    json.map((listing) => {
      return (myListingsContainer.innerHTML += listingsHTML(
        listing.media,
        listing.title,
        listing.seller.name,
        listing.endsAt,
        listing.bids,
        listing.id
      ));
    });
  } else {
    myListingsContainer.innerHTML = `
    <p class="font-mainFont mb-4">You have no active bids!</p>
    
    <a href="./listings.html" class="register bg-secondaryPurple font-mainFont text-offWhite text-xs px-2 py-1 mb-4 rounded-sm">Browse listings</a>`;
  }
}

myBidsBtn.addEventListener("click", getUserBids);
myListingsBtn.addEventListener("click", getUserListings);
