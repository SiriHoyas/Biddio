/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
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
        bgDark: "#252530",
        cardsBgDark: "#343443",
        borderDark: "#4F4F60",
        inactiveText: "#7D7D7D",
        offWhite: "#EBEBEB",
        primaryPurple: "#654DC7",
        secondaryPurple: "#453293",
      },
      fontFamily: {
        mainFont: ["K2D", "sans-serif"],
        bodyFont: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        indexGraphicDarkMobile: "url('../src/img/indexGraphicDarkMobile.svg')",
      },
    },
  },
  plugins: [],
};
