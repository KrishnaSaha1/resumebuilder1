/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d9fe',
          300: '#a4c0fc',
          400: '#7e9ef8',
          500: '#587bf2',
          600: '#385ce8',
          700: '#2848cc',
          800: '#243ba3',
          900: '#1e3a8a', // Primary Navy
          950: '#172554',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f5f0de',
          200: '#ebdeb8',
          300: '#dec589',
          400: '#d4af37', // Primary Gold
          500: '#b89228',
          600: '#96711f',
          700: '#78561c',
          800: '#63461d',
          900: '#543b1d',
          950: '#2e1e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
