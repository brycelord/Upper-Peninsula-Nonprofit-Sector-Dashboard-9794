/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nmu: {
          green: '#095339',
          gold: '#ffc425',
          red: '#c41230',
          'green-light': '#0d7a53',
          'green-dark': '#053726',
          'gold-light': '#ffd966',
          'gold-dark': '#e5ac00',
        },
        // Remap legacy palette keys used across the app to NMU brand equivalents
        // so existing class names render in the new identity without per-file edits.
        yellow: {
          50: '#fff9e6',
          100: '#fff0b8',
          200: '#ffe585',
          300: '#ffd752',
          400: '#ffc425', // NMU Gold
          500: '#f5b800',
          600: '#d99f00',
          700: '#a67a00',
          800: '#735500',
          900: '#403000',
          950: '#261c00',
        },
        teal: {
          50: '#e6f2ec',
          100: '#bfdccb',
          200: '#95c3a8',
          300: '#6aaa85',
          400: '#409668',
          500: '#0d7a53',
          600: '#095339', // NMU Green
          700: '#07462f',
          800: '#053726',
          900: '#03261a',
          950: '#011810',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Cera Pro', 'Cera', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'Cera Pro', 'Cera', 'sans-serif'],
        heritage: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        'spin-slow': {
          to: { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite'
      }
    },
  },
  plugins: [],
}
