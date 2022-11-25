import { fetchContent } from "./components/fetchContent.mjs";
import { setLocalStorage } from "./components/setLocalStorgage.mjs";

async function login(e) {
  e.preventDefault();

  const loginCredentials = {
    email: document.querySelector("#login-email").value,
    password: document.querySelector("#login-password").value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const result = await fetchContent("/auth/login", options);

    const { accessToken, name, credits, avatar } = await result.json();

    if (result.ok) {
      window.location.href = "../../index.html";
      setLocalStorage("accessToken", accessToken);
      setLocalStorage("userName", name);
      setLocalStorage("userCredits", credits);
      setLocalStorage("userAvatar", avatar);
    }
  } catch (error) {
    console.log("error");
  }
}

document.querySelector(".loginForm").addEventListener("submit", login);
