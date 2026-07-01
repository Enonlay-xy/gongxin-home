/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1e40af',
          600: '#1e3a8a',
          700: '#1e3a8a',
          800: '#172554',
          900: '#0f172a',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        }
      },
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: '#ef4444' },
          '50%': { borderColor: 'transparent' },
        },
        'spring-expand': {
          '0%': { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
          '60%': { transform: 'scale(1.05) translateX(-4px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
        },
        'spring-collapse': {
          '0%': { transform: 'scale(1) translateX(0)', opacity: '1' },
          '100%': { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
        },
        'spring-pop': {
          '0%': { transform: 'scale(0.5) translateX(10px)', opacity: '0' },
          '70%': { transform: 'scale(1.08) translateX(-2px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 0.6s ease-in-out 0s 3',
        'spring-expand': 'spring-expand 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-collapse': 'spring-collapse 0.3s ease-in forwards',
        'spring-pop': 'spring-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
