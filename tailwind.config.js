/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#002147', // Deep Navy
          light: '#003366',
          dark: '#001a35',
        },
        gold: {
          DEFAULT: '#C5A059', // Classic Gold
          light: '#D4AF37',
          dark: '#A38044',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};