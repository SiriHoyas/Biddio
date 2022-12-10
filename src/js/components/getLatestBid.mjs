/**
 * This function takes in an array, and returns it. If the array is empty, it returns the fallback string.
 * @param {array} array this should be the array of bids from a listing
 * @param {string} fallback this should be what you want to be displayed if array is empty
 * @returns Returns the last item in the array
 *
 * @example
 * ```js
 * const array = [1, 2, 3, 4]
 * const lastBid = getLastItem(array, "No bids")
 * console.log(lastBid)
 *
 * //expect console log to be 4
 * ```
 */
export function getLastItem(array, fallback) {
  const lastItem = array.slice(-1);

  return lastItem.length === 0 ? fallback : lastItem[0];
}
