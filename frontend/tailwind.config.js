/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F8F4FF',
          'bg-secondary': '#FFFFFF',
          accent: '#C026D3',
          'accent-cyan': '#06B6D4',
          text: '#21133E',
          'text-soft': '#6B5C7E',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 18px 45px rgba(58, 16, 107, 0.11)',
        'glow-cyan': '0 18px 45px rgba(6, 182, 212, 0.2)',
      }
    },
  },
  plugins: [],
}
