/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: "20rem",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
