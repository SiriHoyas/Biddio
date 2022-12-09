import { fetchContent } from "./fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

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
