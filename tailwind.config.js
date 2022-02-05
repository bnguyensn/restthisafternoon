const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['"Bubblegum Sans"', 'sans'],
      mono: ['ui-monospace', 'Consolas', '"Courier New"', 'monospace'],
    },

    extend: {
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
