import { fetchContent } from "./fetchContent.mjs";
import { getLocalStorage } from "./getLocalstorage.mjs";

export async function getListings() {
  const { accessToken } = getLocalStorage();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  //if flags then do this url
  //if not do other url
  //OFFSET, useflags = false
  //if offset.length er mindre enn huundre, break and eat foods

  const response = await fetchContent(
    `/listings?_seller=true&_bids=true`,
    options
  );
  const json = await response.json();
  return json;
}

// console.log(await getListings());

// const listi = await getListings();

// const titles = listi.map((listings) => {
//   return listings.title;
// });

// console.log(titles);
