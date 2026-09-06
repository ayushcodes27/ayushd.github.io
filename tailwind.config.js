/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a0a0a',
          light: '#fcfcfc',
          accent: '#00f0ff', // Cyber cyan accent
          lime: '#e0ff00',   // Neon lime accent
          purple: '#7928ca',
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          }
        }
      },
      boxShadow: {
        'brutal': '6px 6px 0px #000000',
        'brutal-sm': '3px 3px 0px #000000',
        'brutal-lg': '10px 10px 0px #000000',
        'brutal-hover': '8px 8px 0px #000000',
        'brutal-accent': '6px 6px 0px #00f0ff',
        'brutal-lime': '6px 6px 0px #e0ff00',
      }
    },
  },
  plugins: [],
}
