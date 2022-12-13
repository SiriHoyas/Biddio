/**
 *
 * @param {ISOSstring} endsAt the auction end time
 * @returns the date and time using the current locale
 *
 * @example
 * ```js
 * const endsAt = "2022-12-17T18:36:00.000Z"
 *
 * const {date, time} = convertEndtime(endsAt)
 * console.log(date, time)
 *
 * //Expect output Sat Dec 17 2022 19:36:00 GMT+0100 (Central European Standard Time)
 * // Output may vary based om your location
 * ```
 */
export function convertEndtime(endsAt) {
  const endTime = new Date(endsAt);
  endTime.toISOString();

  const date = endTime.toLocaleDateString();
  const time = endTime.toLocaleTimeString();

  return { date, time };
}
// TODO: Test this
