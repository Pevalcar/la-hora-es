const {
  platformColor,
  platformSelect,
  hairlineWidth,
} = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderWidth: {
        hairline: hairlineWidth(),
      },
      colors: {
        primary: platformColor("primary_text_dark"),
        error: platformSelect({
          ios: platformColor("systemRed"),
          android: platformColor("systemError"),
          default: platformColor("systemRed"),
        }),
      },
    },
  },
  plugins: [],
};
