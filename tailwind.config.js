/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        dark: {
          900: '#0d1117',
          800: '#161b22',
          700: '#1c2128',
          600: '#21262d',
        },
        accent: {
          cyan: '#00d4ff',
          violet: '#8b5cf6',
          green: '#10d48e',
          orange: '#f97316',
          red: '#ef4444',
        }
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'kenburns': 'kenburns 20s ease-out infinite alternate',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        }
      }
    },
  },
  plugins: [],
}
