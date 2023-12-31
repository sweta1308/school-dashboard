/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      "2xl": { max: "1500px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "670px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "470px" },
    },
    extend: {
      colors: {
        "primary-color": "rgb(55, 125, 255)",
        "primary-dark": "#0453e7",
      },
    },
  },
  plugins: [],
};
