export function listingsHTML(
  listingImg,
  listingTitle,
  listingSeller,
  date,
  month,
  year,
  hours,
  minutes,
  seconds,
  currentBid,
  listingID
) {
  const html = `
  <div class="listing-card mb-5">
          <div class="image-container w-full h-72">
            <img src="${listingImg}" alt="Image of ${listingTitle}" onerror="this.src = './src/img/listings-placeholder.png';" class="listing-img rounded-sm w-full h-72 object-cover" />
          </div>
          <div class="listing-info">
            <p class="font-mainFont text-xl dark:text-offWhite">${listingTitle}</p>
            <p class="font-mainfont text-inactiveTextLight text-sm dark:text-inactiveTextDark">Sold by ${listingSeller}</p>
            <div class="time-left flex justify-between">
              <p class="font-mainFont dark:text-offWhite">Ends</p>
              <div>
                <div class="end-date">
                  ${date}.
                  ${month}.
                  ${year}
                </div>
                <div class="end-time">
                  ${hours}:
                  ${minutes}:
                  ${seconds}
              </div>
            </div>
          </div>
          <div class="bid-info flex items-center justify-between">
            <p class="font-mainFont dark:text-offWhite">Current bid</p>
            <p class="current-bid bg-secondaryPurple rounded-sm px-2 py-1 text-offWhite font-mainFont">${currentBid}</p>
          </div>
          <a href="./../single-listing.html?id=${listingID}" class="flex justify-center bg-secondaryPurple w-full rounded-sm p-1 mt-5 text-offWhite font-mainFont">View Listing</a>
        </div>
        `;
  return html;
}
