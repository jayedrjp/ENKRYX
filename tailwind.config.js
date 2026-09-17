/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: "#006E87",
        teal: "#005A70",
        heading: "#071827",
        canvas: "#FCFDFE",
        card: "#FFFFFF",
        border: "#DCE6EB",
        grid: "#EAF1F4",
        muted: "#5F7285",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      transitionDuration: {
        250: "250ms",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
