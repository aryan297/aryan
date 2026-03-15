/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ─────────────────────────────────────────────────────
         Tron-Legacy × Ghibli colour palette
         Indigo  → soft mint-sage   (primary glow)
         Cyan    → soft lavender    (secondary glow)
         Emerald → warm amber-gold  (tertiary / warmth)
         Purple  → soft peach-coral (accent)
      ───────────────────────────────────────────────────── */
      colors: {
        indigo: {
          50:  '#f0faf4',
          100: '#d8f3e6',
          200: '#b8e8cc',
          300: '#8ed4b0',
          400: '#7ecba1',   // main mint
          500: '#5bb88a',
          600: '#48a075',
          700: '#3a8060',
          800: '#2d6050',
          900: '#1e4038',
          950: '#0f2520',
        },
        cyan: {
          50:  '#f6f3fe',
          100: '#ece7fa',
          200: '#d8cff5',
          300: '#c9baee',
          400: '#c4b4e8',   // main lavender
          500: '#b0a0de',
          600: '#9080ce',
          700: '#7060b8',
          800: '#50469a',
          900: '#382e78',
          950: '#20185a',
        },
        emerald: {
          50:  '#fffdf0',
          100: '#fef8d8',
          200: '#fdeeb0',
          300: '#fbe088',
          400: '#f5c87a',   // warm gold
          500: '#e8b660',
          600: '#d09840',
          700: '#b07830',
          800: '#885a20',
          900: '#604010',
          950: '#3a2508',
        },
        purple: {
          300: '#f5cdb8',
          400: '#f0a888',   // soft peach
          500: '#e89070',
          600: '#d87850',
        },
        /* keep a warm-tinted dark background scale */
        ghibli: {
          bg:      '#07101c',
          surface: '#0d1a28',
          card:    '#101f2e',
          border:  'rgba(126,203,161,0.13)',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },

      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient':   'gradient 8s ease infinite',
        'spin-slow':  'spin 20s linear infinite',
        'scan':       'scan 4s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
