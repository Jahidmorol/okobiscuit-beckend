/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        DMSans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#2e3192",
        secondary: "#e82028",
        accent: "#333",
        tertiary: "#019a9a",
      },
    },
  },
  plugins: [],
};
