import { fetchContent } from "./fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

/**
 * This function fetches listings from the API with GET HTTP Method.
 * You can add more flags based on what response you need, and also set the sort-order. These parameters are optional and have set defaults
 * The function returns the response from the API parsed as JSON.
 *
 * @param {string} flags Add more flags than the function has by default
 * @param {string} order Set order. Either "asc" or "desc"
 *
 * @example
 * ```js
 * const listings = await getListings(`&offset=0&limit=27_active=true`);
 * ```
 */
export async function getListings(flags = "", order = "desc") {
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
