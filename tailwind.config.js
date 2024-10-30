
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your components
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../public/images/DepartureStation.webp')",
      },
      backgroundOpacity: {
        'custom': '0.75' // Example: 75% opacity
      }
    },
  },
  plugins: [],
}
