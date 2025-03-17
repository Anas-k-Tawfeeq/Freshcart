/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1560px',
      // => @media (min-width: 1536px) { ... }
    },
    container:{
      center:true,
      padding:'2rem'
    },
    extend: {
      fontFamily: {
        'sans': ['"Encode Sans"', 'system-ui', 'sans-serif'],
      },
      colors:{
        'green-color':'#0aad0a',
        'light-color':'#f0f3f2',
        'rating-color':'#ffc908',
        dark: {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#2d2d2d',
          'text-primary': '#ffffff',
          'text-secondary': '#a0a0a0',
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
