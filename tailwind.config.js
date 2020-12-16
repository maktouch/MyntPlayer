const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    mynt: {
      DEFAULT: "#84a719",
      gray: "#343434",
    },
  },
};

module.exports = {
  purge: ["./src/**/*.tsx", "./src/**/*.ts", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
