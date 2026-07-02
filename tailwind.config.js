/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#FFF9E6',
          100: '#FFF0C2',
          400: '#FFC627', // NMU Gold
          500: '#E6B223',
          600: '#CC9E1F',
        },
        gray: {
          800: '#004836', // NMU Dark Green
          900: '#005C46', // NMU Green Main
          950: '#003326', // NMU Deep Green
        }
      }
    }
  },
  plugins: [],
}