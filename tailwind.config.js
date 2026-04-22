/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052ff',
        'primary-container': '#b7c4ff',
        'on-primary': '#ffffff',
        secondary: '#6b7280',
        'secondary-container': '#f3f4f6',
        surface: '#ffffff',
        'surface-variant': '#f3f4f6',
        'on-surface': '#111827',
        'on-surface-variant': '#6b7280',
        outline: '#e5e7eb',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
