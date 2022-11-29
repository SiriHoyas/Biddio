import { fetchContent } from "../../components/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { singleListingHTML } from "../../components/templates/singleListingTemplate.mjs";

async function fetchListingInfo() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const listingID = params.get("id");

  const { accessToken } = getLocalStorage;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(
    `/listings/${listingID}?_seller=true&_bids=true`,
    options
  );

  return await response.json();
}

async function populateListingInfo() {
  const { media, title, description, seller, endsAt, bids } =
    await fetchListingInfo();
  const { avatar, name } = seller;

  document.querySelector(".listing-info").innerHTML = singleListingHTML(
    media,
    title,
    description,
    avatar,
    name,
    endsAt,
    bids
  );
}

populateListingInfo();

async function getListingBids() {
  const { bids } = await fetchListingInfo();
  const mappedBids = bids.map((bids) => {
    return bids;
  });
  console.log(mappedBids);

  //last bid
  console.log(mappedBids.slice(-1));
}

getListingBids();
