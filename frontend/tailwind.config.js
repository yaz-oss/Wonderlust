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
          bg: '#0B1020',
          'bg-secondary': '#121A2F',
          accent: '#7C4DFF',
          'accent-cyan': '#00D4FF',
          text: '#F5F7FF',
          'text-soft': '#AAB2D5',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 77, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
