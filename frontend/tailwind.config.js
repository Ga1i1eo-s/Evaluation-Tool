/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#7C3AED',
          600: '#6D28D9',
        },
        green: {
          500: '#16A34A',
          600: '#15803D',
        },
        amber: {
          500: '#D97706',
          600: '#B45309',
        },
        red: {
          500: '#DC2626',
          600: '#B91C1C',
        },
        orange: {
          500: '#F97316',
          600: '#EA580C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
