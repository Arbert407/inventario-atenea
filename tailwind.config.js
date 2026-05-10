/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        primary: '#4CC9F0',
        'primary-dark': '#3AA7CC',
        secondary: '#F5C518',
        success: '#22C55E',
        warning: '#EAB308',
        danger: '#EF4444',
        info: '#60A5FA',
        'text-primary': '#E5E7EB',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        border: 'rgba(255,255,255,0.12)',
        surface: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}