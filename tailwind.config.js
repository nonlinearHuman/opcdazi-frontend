/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Discord风格深色主题
        'discord': {
          'dark': '#202225',
          'darker': '#18191c',
          'gray': '#2f3136',
          'light': '#36393f',
          'lighter': '#40444b',
          'text': '#dcddde',
          'muted': '#72767d',
          'accent': '#5865f2',
        }
      }
    },
  },
  plugins: [],
}
