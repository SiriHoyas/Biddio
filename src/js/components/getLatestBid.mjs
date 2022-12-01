export function getLastItem(array, fallback) {
  const lastItem = array.slice(-1);

  if (lastItem.length === 0) {
    return fallback;
  } else {
    return lastItem[0];
  }
}
