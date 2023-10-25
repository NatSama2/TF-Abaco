/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'grisMuyClaro': '#E6E6E6',
      'gris-oscuro':'#4d4d4d',
      'verde-oscuro': '#065624',
      'naranja': '#f58634',
      'verde-claro': '#8cc63f',
      'amarillo': '#d2de38',
      'negro': '#272323'

    },
    extend: {},
  },
  plugins: [],
}