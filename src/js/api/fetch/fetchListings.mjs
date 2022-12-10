import { fetchContent } from "./fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

/**
 * This function fetches listings from the API with GET HTTP Method.
 * You can add flags based on what response you need, and also set the sort-order.
 * The function returns the response from the API parsed as JSON.
 */
export async function getListings(flags, order = "desc") {
  const { accessToken } = getLocalStorage();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(
    `/listings?_seller=true&_bids=true&sort=created&sortOrder=${order}&${flags}`,
    options
  );
  const json = await response.json();
  return json;
}
