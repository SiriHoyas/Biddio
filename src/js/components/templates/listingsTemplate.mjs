export function listingsHTML(listingImg, listingTitle, listingSeller, date, time, currentBid, listingID) {
  const html = `
  <div class="listing-card mb-5 w-full  border p-2 rounded-sm dark:border-borderDark">
          <div class="image-container w-full h-72">
            <img src="${listingImg}" alt="Image of ${listingTitle}" onerror="this.src = './src/img/listings-placeholder.png';" class="listing-img rounded-sm w-full h-72 object-cover" />
          </div>
          <div class="listing-info">
            <p class="font-mainFont text-xl truncate h-10 dark:text-offWhite">${listingTitle}</p>
            <p class="font-mainfont text-inactiveTextLight text-xs -mt-3 dark:text-inactiveTextDark">Sold by ${listingSeller}</p>
            
              <p class="font-mainFont mt-3 dark:text-offWhite">Ends:</p>
              <div class="flex justify-between">
                <div class="end-date font-mainFont flex justify-end mr-4 dark:text-offWhite">
                  ${date}
                </div>
                <div class="end-time font-mainFont flex justify-end  dark:text-offWhite">
                  ${time}
              </div>
            
          
          </div>
          <hr class="w-full mb-5 mt-2 boarder dark:border-borderDark">
          <div class="bid-info flex items-center justify-between">
            <p class="font-mainFont dark:text-offWhite">Current bid</p>
            <p class="current-bid bg-secondaryPurple rounded-sm px-2 py-1 text-offWhite font-mainFont">${currentBid}</p>
          </div>
          <a href="./single-listing.html?id=${listingID}" data-cy="listing-card" class="flex justify-center bg-secondaryPurple w-full rounded-sm p-1 mt-5 text-offWhite font-mainFont hover:bg-primaryPurple">View Listing</a>
        </div>
        `;
  return html;
}
