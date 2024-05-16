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
      "overlay-show": {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      "content-show": {
        from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
      },
    },
    animation: {
      "slide-down": "side-down 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "slide-up": "slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "overlay-show": "overlay-show 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      "content-show": "content-show 300ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  plugins: [],
};
