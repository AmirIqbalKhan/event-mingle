const { theme } = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme,
  plugins: [require('tailwindcss-animate')],
}; 