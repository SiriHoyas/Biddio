export function setEndTime(days) {
  const currentTime = new Date();

  currentTime.setDate(currentTime.getDate() + days);

  const daysInput = days;
  const endTime = new Date(currentTime + daysInput);

  return endTime.toISOString();
}
// TODO: Test this
