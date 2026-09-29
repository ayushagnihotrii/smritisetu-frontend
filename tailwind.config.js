/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="kiosk-night"]'],
  theme: {
    extend: {
      colors: {
        'ambedkar-blue': '#1E3A8A',
        'raw-indigo': '#223C63',
        'dark-wash': '#1A2B45',
        'twill-dark': '#121E33',
        'denim-midnight': '#0A111C',
        'thread-gold': '#f0c36d',
        'brass': '#DCB35C',
        'copper': '#B87333',
        'selvedge-red': '#C93B2B',
        'parchment': '#FBF9F4',
        'denim-steel': '#506584',
        'denim-sky': '#B8C8DF',
      },
      fontFamily: {
        serif: ['Roboto Slab', 'Noto Serif Devanagari', 'serif'],
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'copper': '0 0 0 1px #B87333, 0 4px 12px rgba(184, 115, 51, 0.25)',
        'brass': '0 0 0 1px #DCB35C, 0 4px 16px rgba(220, 179, 92, 0.3)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 0.25s ease-out',
      }
    },
  },
  plugins: [],
}
