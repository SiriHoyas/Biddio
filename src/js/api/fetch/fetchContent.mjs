import { baseURL } from "./baseURL.mjs";

/**
 * This will make a call to the API to fetch content based on the endpoint.
 * The function returns the content. It does however not parse to JSON, and needs to be done outside of the function.
 * 
 * @param {string} endpoint Start endpoint with a backslash.
 * @param {*} options Needs to contain HTTP method, body, and authorization if required. See API documentation.
 * @example
 * ```js
 * const response = await fetchContent("/listings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    });

    // To parse to JSON: 
    const json = response.json();
 * 
 * ```
 */

export async function fetchContent(endpoint, options) {
  return await fetch(`${baseURL}${endpoint}`, options);
}
