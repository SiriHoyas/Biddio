import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

const { accessToken } = getLocalStorage();
if (accessToken) {
  window.location.href = "./index.html";
}

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
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", name);
      localStorage.setItem("userCredits", credits);
      localStorage.setItem("userAvatar", avatar);
    }
  } catch (error) {
    console.log("error");
  }
}

document.querySelector(".loginForm").addEventListener("submit", login);
