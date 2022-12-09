import { fetchContent } from "./fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

export async function getListings(flags) {
  const { accessToken } = getLocalStorage();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(
    `/listings?_seller=true&_bids=true&sort=created&sortOrder=desc&${flags}`,
    options
  );
  const json = await response.json();
  return json;
}
