import { logout } from "../../components/removeLocalStorage";

test("Removes accesstoken, username, useravatar and usercredits from local storage", () => {
  logout();
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const userAvatar = localStorage.getItem("userAvatar");
  const userCredits = localStorage.getItem("userCredits");

  expect(accessToken).toBeNull();
  expect(userName).toBeNull();
  expect(userAvatar).toBeNull();
  expect(userCredits).toBeNull();
});
