/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1920px",
      },
      fontSize: {
        "clamp-title": "clamp(1.25rem, 2.5vw, 2.5rem)",
        "clamp-text": "clamp(0.8rem, 1.5vw, 1rem)",
      },
      fontFamily: {
        "lilita-one": ["lilita-one", "Segoe UI"],
        "worksans-light": ["worksans-light", "sans-serif"],
        "worksans-regular": ["worksans-regular", "sans-serif"],
        "worksans-bold": ["worksans-bold", "sans-serif"],
      },
      colors: {
        primary: "#2E3192",
        secondary: "#151868",
        tertiary: "#D12121",
        quaternary: "#707070",
        quinary: "#E6E6E6",
        senary: "#929292",
      },
      backgroundImage: {},
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
