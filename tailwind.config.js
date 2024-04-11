/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Be Vietnam Pro", 'sans-serif']
    },
    extend: {
      colors: {
        primary: "#3699FF",
        "primary-hover": "#187DE4",
        danger: '#f64e60',
        "danger-hover": '#EE2D41',
        muted: "#B5B5C3"
      }
    },
  },
  plugins: [],
}