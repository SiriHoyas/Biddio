import { fetchContent } from "./components/fetchContent.mjs";

async function login(e) {
  e.preventDefault();
  console.log("object");

  const emailInput = document.querySelector("#login-email").value;
  const passwordInput = document.querySelector("#login-password").value;

  console.log(passwordInput, emailInput);

  try {
    const loginCredentials = {
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

    const result = await fetchContent("/auth/login", options);

    console.log(result);
    const { accessToken } = await result.json();

    if (result.ok) {
      window.location.href = "../../index.html";
      localStorage.setItem("accessToken", accessToken);
    }
  } catch (error) {
    console.log("error");
  }
}

document.querySelector(".loginForm").addEventListener("submit", login);
