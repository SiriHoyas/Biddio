export function listingsHTML(
  listingImg,
  listingTitle,
  listingSeller,
  timeLeft,
  currentBid
) {
  const html = `
  <div class="listing-card">
    <img src="${listingImg}" alt="image of ${listingTitle}" class="listing-img">
    <div class="listing-info">
        <p>${listingTitle}</p>
        <p>Sold by ${listingSeller}</p>
        <div class="time-left">
            <p>Time left</p>
            <p>${timeLeft}</p>
        </div>
    </div>
    <div class="bid-info">
        <p>Current bid</p>
        <p class="current-bid">${currentBid}</p>
    </div>
    <button>View Listing</button>
  </div>
  `;
  return html;
}
