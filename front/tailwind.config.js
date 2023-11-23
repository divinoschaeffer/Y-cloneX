/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'twitter-blue': '#1DA1F2',
      },
      fontSize:{
        'full': '27em',
      },
    },
  },
  plugins: [],
}

