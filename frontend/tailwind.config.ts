import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bamboo: {
          50: '#fcfbf7',
          100: '#f8f4e9',
          200: '#f0e6ce',
          300: '#e3d2aa',
          400: '#d0b37c',
          500: '#be9553', // Primary warm gold bamboo tone
          600: '#a67b3e',
          700: '#8b612f',
          800: '#714b26',
          900: '#5c3d1f',
          950: '#342110',
        },
        luxury: {
          dark: '#0f0e0c',     // Premium charcoal black
          darker: '#080706',   // Extreme rich black
          light: '#f5f4f0',    // Soft warm luxury gray
          gold: '#cda250',     // Bright metallic gold
          muted: '#8e8a82',    // Luxury warm gray text
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-delayed': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1.05)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
