/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-red": "#ff0000",
        "my-orange": "#ff6600",
        "my-yellow": "#fbfb00",
        "my-blue": "#006ca5",
        "my-green": "#4acf50",
        "my-pink": "#ff8fad",
        "my-purple": "#c154c1",
        "my-pastel": "#fcf5c1",
      },
    },
  },
  plugins: [],
};
