import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Priori Sans", ...fontFamily.serif],
      sans: ["Aptifer Sans", ...fontFamily.sans],
    },
    extend: {
      colors: {
        calypso: {
          50: "#f4f6fb",
          100: "#e8ecf6",
          200: "#ccd8eb",
          300: "#9fb8da",
          400: "#6c93c4",
          500: "#4976ae",
          600: "#375c92",
          700: "#2e4b76",
          800: "#273d5e",
          900: "#263754",
          950: "#1a2437",
        },
        victoria: {
          50: "#f9f7fd",
          100: "#f1edfa",
          200: "#e4def6",
          300: "#d0c4ee",
          400: "#b39fe1",
          500: "#9679d3",
          600: "#7e5cc1",
          700: "#6948a8",
          800: "#614495",
          900: "#4a346f",
          950: "#2f1c4f",
        },
      },
      keyframes: {
        "side-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "slide-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        "slide-down": "side-down 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        "slide-up": "slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
