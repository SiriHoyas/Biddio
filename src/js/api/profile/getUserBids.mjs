import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { convertEndtime } from "../../time/convertEndtime.mjs";

export async function getUserBids(userName, profileOptions, container) {
  container.innerHTML = "";

  const response = await fetchContent(`/profiles/${userName}/bids?_listings=true`, profileOptions);
  const json = await response.json();

  if (json.length >= 1) {
    json.forEach((listing) => {
      const { date, time } = convertEndtime(listing.listing.endsAt);
      container.innerHTML += `
        <a href="./../single-listing.html?id=${listing.listing.id}" class="my-bids border border-black rounded-sm p-2 w-full mb-4 hover:bg-white dark:bg-cardsBgDark dark:border-borderDark dark:text-offWhite dark:hover:bg-borderDark">
          <p class="font-mainFont truncate">${listing.listing.title}</p>
          <p class="font-mainFont text-xs">My bid: ${listing.amount}</p>
          <div class>
            <p class="font-mainFont text-sm mt-2">Ends:</p>
            <p class="font-mainFont text-xs">${date}</p>
            <p class="font-mainFont text-xs">${time}</p>
          </div>
        </a>
        `;
    });
  } else {
    container.innerHTML = `
      <p class="font-mainFont mb-4">You have no active bids!</p>
  
      <a href="./listings.html" class="register bg-secondaryPurple font-mainFont text-offWhite text-xs px-2 py-1 mb-4 rounded-sm">Browse listings</a>`;
  }
}
