export function getLastItem(array, fallback) {
  const lastItem = array.slice(-1);

  return lastItem.length === 0 ? fallback : lastItem[0];
}
