/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50:  '#E8EBF7',
          100: '#C5CCF0',
          200: '#8A99E0',
          300: '#5A6DD0',
          400: '#3A4DB8',
          500: '#20309A',
          600: '#1A277D',
          700: '#161F6A',
          800: '#101750',
          900: '#0A0F36',
        },
        tomato: {
          50:  '#FDE8E9',
          100: '#F9C5C7',
          200: '#E8888B',
          300: '#D85558',
          400: '#D43A42',
          500: '#BB232B',
          600: '#9D1D24',
          700: '#8F1A20',
          800: '#6B1318',
          900: '#470D10',
        },
        cream:  '#F8F7F4',
        ink:    '#0A0A0A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['Space Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'marquee': 'marquee-left 30s linear infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
