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
          DEFAULT: '#3B4FE0',
          50: '#EEF0FD',
          100: '#D6DAFB',
          200: '#AEB5F7',
          300: '#8590F3',
          400: '#5D6BEF',
          500: '#3B4FE0',
          600: '#2F43CC',
          700: '#2335B8',
          800: '#1A2894',
          900: '#111B70',
        },
        accent: {
          DEFAULT: '#C2440E',
          hover: '#A33A0C',
          light: '#F97316',
        },
        navy: {
          DEFAULT: '#1A1F5E',
          light: '#2D3480',
        },
        surface: {
          DEFAULT: '#F4F6FF',
          dark: '#E8ECFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(59, 79, 224, 0.08)',
        'card-hover': '0 8px 24px rgba(59, 79, 224, 0.16)',
        'button': '0 4px 14px rgba(59, 79, 224, 0.3)',
      },
    },
  },
  plugins: [],
}
