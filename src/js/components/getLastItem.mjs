export function getLastItem(array, fallback) {
  const lastItem = array.slice(-1);

  if (lastItem.length === 0) {
    return fallback;
  } else {
    console.log(lastItem[0].amount);
    return lastItem[0];
  }
}
