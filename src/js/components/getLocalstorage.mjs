export function getLocalStorage() {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const userCredits = localStorage.getItem("userCredits");
  const userAvatar = localStorage.getItem("userAvatar");

  return { accessToken, userName, userCredits, userAvatar };
}
