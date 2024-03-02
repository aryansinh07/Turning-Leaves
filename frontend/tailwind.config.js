/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'varela':['"Varela Round"',"sans-serif"]
      }
    },
  },
  plugins: [
    // Ensure you include any necessary plugins here
    require("@designbycode/tailwindcss-text-stroke"),
  ],
}