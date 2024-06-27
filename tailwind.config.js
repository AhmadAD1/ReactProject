// eslint-disable-next-line @typescript-eslint/no-var-requires
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
 flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6363',
        "primary-datk": '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
    },
  },
  plugins: [ flowbite.plugin(),],
}

