export function sortBiddingHistory(bids) {
  const sortedBids = bids.sort((bid1, bid2) => {
    return bid2.amount - bid1.amount;
  });

  return sortedBids;
}
