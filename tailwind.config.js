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
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'spring-collapse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        'spring-pop': {
          '0%': { transform: 'scale(0.5) translateX(10px) translateY(-50%)', opacity: '0' },
          '70%': { transform: 'scale(1.03) translateX(-1px) translateY(-50%)', opacity: '1' },
          '100%': { transform: 'scale(1) translateX(0) translateY(-50%)', opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 0.6s ease-in-out 0s 3',
        'spring-expand': 'spring-expand 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-collapse': 'spring-collapse 0.13s ease-in forwards',
        'spring-pop': 'spring-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
