/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      translate: {
        "1/2full": "150%",
        "2full": "200%",
      },
    },
  },
  plugins: [],
};
