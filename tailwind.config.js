/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        bgDark: "#252530",
        cardsBgDark: "#343443",
        borderDark: "#363642",
        inactiveText: "#7D7D7D",
        offWhite: "#EBEBEB",
        primaryPurple: "#654DC7",
        secondaryPurple: "#453293",
      },
      fontFamily: {
        mainFont: ["K2D", "sans-serif"],
        bodyFont: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
