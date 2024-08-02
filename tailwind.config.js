/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6E6E6',
        secondary: '#F5F5FD',
      }
    },
  },
  plugins: [],
} 

