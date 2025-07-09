/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`], //.ejs files
  theme: {
    extend: {},
  },
  
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

    daisyui: {
    themes: ["light", "dark", "aqua"], 
  },

};



