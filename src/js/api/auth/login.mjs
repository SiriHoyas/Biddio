import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { emailValidation } from "../../components/emailValidation.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

const { accessToken } = getLocalStorage();
if (accessToken) {
  window.location.href = "./index.html";
}

async function login(e) {
  e.preventDefault();

  const emailInput = document.querySelector("#login-email").value;

  const loginCredentials = {
    email: emailInput,
    password: document.querySelector("#login-password").value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const validatedEmail = emailValidation(emailInput);
  const errorMessage = document.querySelector(".login-error");

  if (validatedEmail) {
    try {
      const result = await fetchContent("/auth/login", options);

      const { accessToken, name, credits, avatar } = await result.json();

      if (result.ok) {
        window.location.href = "../../index.html";
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userName", name);
        localStorage.setItem("userCredits", credits);
        localStorage.setItem("userAvatar", avatar);
      } else {
        errorMessage.classList.remove("hidden");
      }
    } catch (error) {
      document.querySelector(".catch-error").classList.remove("hidden");
    }
  } else if (emailInput.length > 0) {
    document.querySelector(".valid-email-error").classList.remove("hidden");
  } else {
    errorMessage.classList.remove("hidden");
  }
}

document.querySelector(".loginForm").addEventListener("submit", login);
