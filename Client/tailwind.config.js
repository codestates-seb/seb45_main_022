/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        title: "url('/src/assets/bg/room.png')",
        map: "url('/src/assets/bg/map.png')",
        feed: "url('/src/assets/bg/village.png')",
        feedBox: "url('/src/assets/feed/feedItem.png')",
        board: "url('/src/assets/feed/board.png')",
        searchBar: "url('/src/assets/feed/searchBar.png')",
        clickedSearchBar: "url('/src/assets/feed/clickedSearchBar.png')",
        notFoundFeed: "url('/src/assets/feed/notFound.gif')",
      },
    },
    fontFamily: {
      default: ['Press Start 2P'],
    },
  },
  plugins: [],
};
