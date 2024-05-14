/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00698B",
        },
        secondary: {
          DEFAULT: "#614495",
        },
      },
    },
  },
  plugins: [],
};
