/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': {'max': '440px'},
        'sm': {'max': '480px'},
        'vertical': {'max': '680px'},
        // 'notOnMobile': {'min': '481px'},
      }
    },
  },
  plugins: [],
}