import { setEndTime } from "./setEndTime.js";

test("returns iso string with endtime with days input", () => {
  const days = 10;
  const currentTime = "Wed Dec 14 2022 15:45:52 GMT+0100 (Central European Standard Time)";
  const endTime = setEndTime(days, currentTime);
  expect(endTime).toEqual(10);
});
