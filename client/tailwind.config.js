// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dull': 'var(--color-primary-dull)',
      },
    },
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // adjust to your project
  plugins: [],
}
