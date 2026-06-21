/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          50: '#FFF7F2',
          100: '#FFE9D9',
          200: '#FFD0B2',
          300: '#FFB080',
          400: '#FF8B4D',
          500: '#FF6B35',
          600: '#E55A28',
          700: '#C4471E',
          800: '#9E3818',
          900: '#7A2B12',
        },
        food: {
          500: '#E63946',
          600: '#CC2233',
        },
        explore: {
          500: '#2A9D8F',
          600: '#21867A',
        },
        knowledge: {
          500: '#7B2CBF',
          600: '#6A24A3',
        },
        shop: {
          500: '#F4A300',
          600: '#D99100',
        },
        ink: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#2B2D42',
          900: '#1A1B2E',
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Source Han Sans CN Heavy"', '"PingFang SC"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(43, 45, 66, 0.08)',
        'card-hover': '0 12px 40px rgba(255, 107, 53, 0.18)',
        canvas: '0 20px 60px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        pop: 'pop 0.25s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
