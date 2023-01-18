/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,html,js}"],
  theme: {
    extend: {
      spacing: {
        '128': '32.6rem',
      }
    },
  },
  plugins: [],
}
