module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Anta: ["Anta", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
