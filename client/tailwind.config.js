/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#003580",
        background: "#febb02",
      },
      fontSize: {
        urbanist: "Urbanist, sans-serif",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
