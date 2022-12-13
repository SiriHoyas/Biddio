import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { emailValidation } from "../../components/emailValidation.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

const { accessToken } = getLocalStorage();
if (accessToken) {
  window.location.href = "./index.html";
}

async function login(e) {
  e.preventDefault();
  const errorMessage = document.querySelector(".login-error");
  const emailValidationMessage = document.querySelector(".valid-email-error");
  errorMessage.classList.add("hidden");
  emailValidationMessage.classList.add("hidden");

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

  const emailIsValid = emailValidation(emailInput);
  const defaultErrorMessage = "Something went wrong. Please try again later.";

  if (emailIsValid) {
    try {
      const response = await fetchContent("/auth/login", options);

      if (response.ok) {
        const { accessToken, name, credits, avatar } = await response.json();
        window.location.href = "./index.html";
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userName", name);
        localStorage.setItem("userCredits", credits);
        localStorage.setItem("userAvatar", avatar);
      } else {
        const status = response.status;
        if (status === 401 || status === 400) {
          errorMessage.innerHTML = "Your email and/or password is wrong";
        } else {
          errorMessage.innerHTML = defaultErrorMessage;
        }
        errorMessage.classList.remove("hidden");
      }
    } catch (error) {
      errorMessage.innerHTML = defaultErrorMessage;
      errorMessage.classList.remove("hidden");
    }
  } else if (emailInput.length > 0) {
    emailValidationMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.remove("hidden");
  }
}

document.querySelector(".loginForm").addEventListener("submit", login);
