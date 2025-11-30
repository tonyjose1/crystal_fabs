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
        // Theme-aware colors
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'background-dots': 'var(--color-background-dots)',
        'text-primary': 'var(--color-text-primary)',
        border: 'var(--color-border)',

        // Static brand colors
        primary: '#1E2DB5',
        'primary-dark': '#171354',
        accent: '#4A5EE5',
        'neutral-dark': '#2F394D',
        'neutral-light': '#E4E4E4',
        white: '#FFFFFF',
        black: '#000000',
      },
      boxShadow: {
        primaryGlow: '0 0 40px rgba(30, 45, 181, 0.8)',
        primaryGlowHover: '0 0 70px rgba(30, 45, 181, 1)',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 40px rgba(30,45,181,0.7)' },
          '50%': { boxShadow: '0 0 70px rgba(30,45,181,1)' },
        },
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        'stagger-in': 'stagger-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
};