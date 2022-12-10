export function countDown(auctionEnds) {
  const endTime = Date.parse(auctionEnds);

  const currentTime = new Date().getTime();
  const diff = endTime - currentTime;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const daysLeft = Math.floor(diff / day);
  const hoursLeft = Math.floor((diff % day) / hour);
  const minutesLeft = Math.floor((diff % hour) / minute);
  const secondsLeft = Math.floor((diff % minute) / second);

  return { daysLeft, hoursLeft, minutesLeft, secondsLeft };
}
