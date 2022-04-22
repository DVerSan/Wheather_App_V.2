module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cta-btns': '#355982',
        'cta-btns-hov': '#728ba8',
        'cta-btns-dark': '#20354e',
      },

      container: {
        center: true,
      },
      backgroundImage: {
        'hero-img':
          "url('/Users/davidverdeguersantolaria/Documents/react/projects/Wheather_App/src/assets/skyBackground.jpg')",
      },
    },
  },
  plugins: [],
};
