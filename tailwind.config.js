/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.js", "./src/**/*.mjs"],
  darkMode: "true",
  theme: {
    borderRadius: {
      none: "0",
      sm: ".17rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
    borderWidth: {
      DEFAULT: ".2px",
      0: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {
      colors: {
        bgLight: "#FEFEFE",
        bgDark: "#252530",
        cardsBgLight: "#F1F1F1",
        cardsBgDark: "#343443",
        borderLight: "#D4D4D4",
        borderDark: "#4F4F60",
        inactiveTextDark: "#7D7D7D",
        inactiveTextLight: "#63636B",
        offWhite: "#EBEBEB",
        primaryPurple: "#654DC7",
        secondaryPurple: "#453293",
        transparentLight: "rgba(255, 255, 255, 0.30)",
        transparentDark: "rgba(255, 255, 255, 0.20)",
      },
      fontFamily: {
        mainFont: ["K2D", "sans-serif"],
        bodyFont: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        loginGraphicLight: "url('../src/img/loginGraphicMobile')",
      },
    },
  },
  plugins: [],
};
