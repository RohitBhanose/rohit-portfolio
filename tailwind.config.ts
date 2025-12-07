import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D9FF',
          light: '#33E5FF',
          dark: '#00B8CC',
        },
        accent: {
          DEFAULT: '#7C3AED',
          light: '#8B5CF6',
          dark: '#6D28D9',
        },
        background: {
          DEFAULT: '#0A0A0F',
          light: '#111118',
          dark: '#050508',
        },
        neon: {
          blue: '#00D9FF',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
        data: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-glow': 'linear-gradient(135deg, #6C63FF 0%, #00E5FF 100%)',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 217, 255, 0.3), 0 0 30px rgba(124, 58, 237, 0.2)',
        'neon-sm': '0 0 8px rgba(0, 217, 255, 0.25)',
        'neon-lg': '0 0 25px rgba(0, 217, 255, 0.4), 0 0 50px rgba(124, 58, 237, 0.3)',
        'data': '0 0 12px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(108, 99, 255, 0.8), 0 0 60px rgba(0, 229, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config



