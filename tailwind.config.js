/** @type {import('tailwindcss').Config} */

/* ─────────────────────────────────────────────────────────────
   Violet #321847 × Imperial Red #f15153

   Components across the app reach for stock Tailwind hues
   (indigo, cyan, slate, emerald…). Rather than rewrite every
   utility class, each of those scales is remapped onto a slice
   of the two-colour palette, so any hue used anywhere still
   lands somewhere on the violet → magenta → red arc.

     indigo / blue  → deep violet   (the #321847 family)
     purple / cyan  → orchid violet (secondary accent)
     pink   / teal  → magenta       (the bridge hue)
     red    / rose  → imperial red  (primary accent)
     orange / amber / yellow → warm salmon
     emerald / green → soft coral   (status + "live" states)
     slate           → violet-tinted neutrals
───────────────────────────────────────────────────────────── */

const violet = {
  50:  '#f4effa',
  100: '#e7dcf5',
  200: '#cfb9ea',
  300: '#b294dc',
  400: '#9370c9',
  500: '#7c46b0',
  600: '#663a92',
  700: '#4d2870',
  800: '#3c1f58',
  900: '#321847',
  950: '#1d0e2b',
};

const orchid = {
  50:  '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d3b4fb',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#4c1178',
  950: '#2e0a4a',
};

const magenta = {
  50:  '#fdf2f8',
  100: '#fce7f3',
  200: '#f9cfe4',
  300: '#f0a8c9',
  400: '#e478ac',
  500: '#d1548c',
  600: '#b93f74',
  700: '#992f5c',
  800: '#712344',
  900: '#4b1730',
  950: '#2b0c1b',
};

const imperial = {
  50:  '#fef3f3',
  100: '#fde4e4',
  200: '#fbcdcd',
  300: '#f9abac',
  400: '#ff6d6f',
  500: '#f15153',
  600: '#e03335',
  700: '#bc2325',
  800: '#8f1c1e',
  900: '#631617',
  950: '#3a0c0d',
};

const salmon = {
  50:  '#fff5f2',
  100: '#ffe8e1',
  200: '#ffd0c2',
  300: '#ffb4a0',
  400: '#ff9179',
  500: '#fa7458',
  600: '#e2573b',
  700: '#b8422b',
  800: '#8a3121',
  900: '#5d2016',
  950: '#35110b',
};

const coral = {
  50:  '#fff5f5',
  100: '#ffe7e7',
  200: '#fdcfd0',
  300: '#fbadaf',
  400: '#f98b8d',
  500: '#f0686a',
  600: '#d84c4e',
  700: '#b03a3c',
  800: '#822b2c',
  900: '#561d1e',
  950: '#310f10',
};

/* Violet-tinted neutrals — light theme (dark ink on pale surfaces) */
const neutral = {
  50:  '#faf8fc',
  100: '#f3eef8',
  200: '#e8dff2',
  300: '#5c4d70',
  400: '#6d5a82',
  500: '#7a688f',
  600: '#4a3a5c',
  700: '#322640',
  800: '#241832',
  900: '#1a1028',
  950: '#120c1e',
};

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo:  violet,
        blue:    violet,
        purple:  orchid,
        cyan:    orchid,
        pink:    magenta,
        teal:    magenta,
        red:     imperial,
        rose:    imperial,
        orange:  salmon,
        amber:   salmon,
        yellow:  salmon,
        emerald: coral,
        green:   coral,
        slate:   neutral,
        gray:    neutral,

        /* Named palette tokens for new markup */
        brand: {
          violet:     '#321847',
          violetMid:  '#4d2870',
          violetLite: '#7c46b0',
          orchid:     '#a855f7',
          magenta:    '#d1548c',
          red:        '#f15153',
          redBright:  '#ff6d6f',
          redSoft:    '#f98b8d',
        },

        surface: {
          bg:       '#f6f2fb',
          base:     '#ffffff',
          card:     '#ffffff',
          elevated: '#efe8f8',
          border:   'rgba(50,24,71,0.10)',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },

      boxShadow: {
        glow:       '0 8px 24px -10px rgba(224,51,53,0.28)',
        'glow-lg':  '0 12px 32px -12px rgba(224,51,53,0.32)',
        orchid:     '0 8px 24px -10px rgba(147,51,234,0.22)',
      },

      backgroundImage: {
        'brand-gradient': 'linear-gradient(115deg, #e03335 0%, #b93f74 45%, #7c46b0 100%)',
        'violet-fade':    'linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(246,242,251,0.7) 100%)',
      },

      animation: {
        float:        'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        gradient:     'gradient 8s ease infinite',
        'spin-slow':  'spin 20s linear infinite',
        scan:         'scan 4s linear infinite',
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
