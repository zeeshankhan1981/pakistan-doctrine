module.exports = {
  content: [
    "./regions/**/*.html",
    "./components/**/*.html",
    "./scripts/**/*.js",
    "./**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Source Sans 3', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        green: {
          50: '#f0fdf5',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      boxShadow: {
        'green': '0 4px 14px 0 rgba(22, 163, 74, 0.25)',
        'green-lg': '0 10px 25px -5px rgba(22, 163, 74, 0.1), 0 8px 10px -6px rgba(22, 163, 74, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
