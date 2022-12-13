import { emailValidation } from "../../components/emailValidation.mjs";
import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

const { accessToken } = getLocalStorage();
if (accessToken) {
  window.location.href = "./index.html";
}

async function registerUser(e) {
  e.preventDefault();

  const usernameInput = document.querySelector("#register-username").value;
  const emailInput = document.querySelector("#register-email").value;
  const passwordInput = document.querySelector("#register-password").value;

  const isCorrectEmail = emailValidation(emailInput);

  const loginCredentials = {
    name: usernameInput,
    email: emailInput,
    password: passwordInput,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const emailError = document.querySelector(".valid-email-error");
    if (isCorrectEmail) {
      const response = await fetchContent("/auth/register", options);
      const json = await response.json();

      if (response.ok) {
        const registerSuccessMessage = document.querySelector(".register-success");
        registerSuccessMessage.classList.remove("hidden");
        registerSuccessMessage.classList.add("flex");

        document.querySelector(".form-container").classList.add("hidden");
      } else {
        const errorMessage = json.errors[0].message;
        const errorMsgContainer = document.querySelector(".error-message");
        errorMsgContainer.classList.remove("hidden");
        errorMsgContainer.innerHTML = errorMessage;
        emailError.classList.add("hidden");
      }
    } else {
      emailError.classList.remove("hidden");
    }
  } catch (error) {
    document.querySelector(".catch-error").classList.remove("hidden");
  }
}

document.querySelector(".registerForm").addEventListener("submit", registerUser);
