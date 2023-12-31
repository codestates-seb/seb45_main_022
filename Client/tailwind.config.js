/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        title: "url('/src/assets/bg/room.png')",
        map: "url('/src/assets/bg/map.gif')",
        strFeed: "url('/src/assets/bg/strFeedBg.gif')",
        dexFeed: "url('/src/assets/bg/dexFeedBg.gif')",
        intFeed: "url('/src/assets/bg/intFeedBg.gif')",
        charmFeed: "url('/src/assets/bg/charmFeedBg.gif')",
        livingFeed: "url('/src/assets/bg/livingFeedBg.gif')",
        feedBox: "url('/src/assets/feed/feedItem.png')",
        board: "url('/src/assets/feed/board.png')",
        searchBar: "url('/src/assets/feed/searchBar.png')",
        clickedSearchBar: "url('/src/assets/feed/clickedSearchBar.png')",
        notFoundFeed: "url('/src/assets/feed/notFound.gif')",
        notFoundPage: "url('/src/assets/bg/404.gif')",
      },
    },
    fontFamily: {
      default: ['Press Start 2P'],
    },
  },
  plugins: [],
};
