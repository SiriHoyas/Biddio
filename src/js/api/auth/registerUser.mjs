import { emailValidation } from "../../components/emailValidation.mjs";
import { fetchContent } from "../../components/fetchContent.mjs";

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
    if (isCorrectEmail) {
      const response = await fetchContent("/auth/register", options);
      if (response.ok) {
        console.log("YAY");
      }
    }
    console.log("nor working");
  } catch (error) {
    console.log(error);
  }
}

document
  .querySelector(".registerForm")
  .addEventListener("submit", registerUser);
