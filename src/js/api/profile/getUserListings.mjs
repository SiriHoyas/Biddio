import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.mjs";
import { convertEndtime } from "../../time/convertEndtime.js";

export async function getUserListings(userName, profileOptions, container) {
  const response = await fetchContent(`/profiles/${userName}/listings?_seller=true&_bids=true`, profileOptions);
  const json = await response.json();

  container.innerHTML = "";

  json.forEach((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");
    const { date, time } = convertEndtime(listing.endsAt);

    container.innerHTML += listingsHTML(
      listing.media[0],
      listing.title,
      listing.seller.name,
      date,
      time,
      bid.amount ? bid.amount : bid,
      listing.id
    );
  });
}
