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
