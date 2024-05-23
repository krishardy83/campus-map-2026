/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        calypso: {
          50: "#e8ffff",
          100: "#c5ffff",
          200: "#92feff",
          300: "#47feff",
          400: "#00f3ff",
          500: "#00d5ff",
          600: "#00a7d7",
          700: "#0083ac",
          800: "#00698b",
          900: "#055574",
          950: "#003951",
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
  plugins: [],
};
