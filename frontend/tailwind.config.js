/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          500: "#795548",
          600: "#6D4C41",
          700: "#5D4037",
        },
      },
    },
  },
  plugins: [],
};
