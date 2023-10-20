/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(128.79deg, rgba(255,255,255,.3) 0, rgba(255,255,255,.15) 100%)",
      },
    },
  },
  plugins: [],
};
