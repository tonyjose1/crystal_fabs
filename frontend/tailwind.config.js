/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E2DB5',
        primarydark: '#171354',
        primarydarker: '#000000',
        secondary: '#2F394D',
        accent: '#E4E4E4',
        greylight: '#E4E4E4',
        greydark: '#2F394D',
        background: '#FFFFFF',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['__Roboto_24c156', 'sans-serif'],
        serif: ['__Playfair_Display_8a3e75', 'serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
