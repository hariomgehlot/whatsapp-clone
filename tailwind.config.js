/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "header-gray": "#F0F2F5",
    },
    extend: {},
    maxHeight: {
      77: "77svh",
    },
    textColor: {
      accent: "#6B7C85",
    },
  },
  plugins: [],
};
