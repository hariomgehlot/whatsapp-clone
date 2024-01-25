/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    variants: {
      animation: ["responsive", "motion-safe", "motion-reduce"],
    },
    colors: {
      "header-gray": "#F0F2F5",
      red: "#ff0000",
      green: "#25D366",
      accent: "6B7C85",
      "hover-accent": "#f5f6f6",
      border: "#e9edef",
      white: "#FFF",
      outgoingMessage: "#d9fdd3",
    },
    fontFamily: {
      WorkSans: ["WorkSans", "sans-serif"],
    },
    extend: {
      fontSize: {
        xxs: "0.55rem",
      },
      backgroundImage: {
        "chat-bg": "url('/assets/images/background.png')",
      },
      backgroundColor: {
        "hover-accent": "#f5f6f6",
      },
    },
    maxHeight: {
      77: "77svh",
      79: "79svh",
      76.9: "76.9svh",
      86: "86svh",
      75: "75svh",
      rem: "100svh",
      73: "73svh",
      "100%": "100%",
    },
    maxWidth: {
      "100%": "100%",
      24: "24rem",
    },
    textColor: {
      accent: "#6B7C85",
      white: "#FFF",
      outgoingMessage: "#d9fdd3",
      black: "#000",
      ticked: "rgba(0, 59, 210, 1)",
    },
  },
  plugins: [],
};
