import { convertEndtime } from "./convertEndtime.js";

test("Convert endtime from ISO to locale date and time string", () => {
  const { date, time } = convertEndtime("2022-12-14T13:30:00.000Z");
  expect(date).toEqual("12/14/2022");
  expect(time).toEqual("14:30:00");
});
