/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: {
    enabled: true,
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [
 
        'border-pkt-black',
      ],
    }
  },
  theme: {
    extend: {
      colors: {
        "primary": "#F47458",
        "accent": "#FFCEAE",
        "primary-light": "#FFF6F4",
        "warn": "#DA1E28"
      }
    },
  },
  plugins: [],
}

