// make json docs for this

import { baseURL } from "./baseURL.mjs";

export async function fetchContent(endpoint, options) {
  return await fetch(`${baseURL}${endpoint}`, options);
}

// const { name, avatar } = await fetchContent();
