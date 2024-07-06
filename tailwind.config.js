/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        bungee: ['"Bungee Inline"', "cursive"],
      },
      colors: {
        blackBackground: "#000000",
        darkBackground: "#202124",
        textColor: "#FFFFFF",
        accentPurple: "#ea80fc",
        buttonBackground: "#8A2BE2",
        buttonText: "#FFFFFF",
        highlightColor: "#4B0082",
        dividerColor: "#212121",
      },
    },
  },
  plugins: [],
};
