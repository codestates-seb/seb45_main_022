/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        title: "url('/src/assets/bg/room.png')",
        map: "url('/src/assets/bg/map.png')",
        feed: "url('/src/assets/bg/village.png')",
      },
    },
  },
  plugins: [],
};
