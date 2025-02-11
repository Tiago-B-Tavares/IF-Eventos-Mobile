/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          700: "#047857", // Cor personalizada para green-700
        },
        orange: {
          500: "#f97316", // Cor personalizada para orange-500
        },
      },
    },
  },
  plugins: [],
};
