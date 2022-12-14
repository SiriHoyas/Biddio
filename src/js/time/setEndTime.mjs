export function setEndTime(days, currentTime) {
  currentTime.setDate(currentTime.getDate() + days);

  const daysInput = days;
  const endTime = new Date(currentTime + daysInput);

  return endTime.toISOString();
}
