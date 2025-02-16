const { platformSelect } = require('nativewind/theme');
const { withTV } = require('tailwind-variants/transformer');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#264BEB',
        secondary: '#F1F1F0',
        black: '#0B0B0B',
        light: '#FFFFFF',
        lightGray: '#ffffff99',
      },
      fontFamily: {
        system: platformSelect({
          ios: 'Roobert-Regular',
          android: 'Roobert-Regular',
          default: 'Roobert-Regular',
        }),
        roobert: ['Roobert-Regular'],
        'roobert-semi': ['Roobert-SemiBold'],
      },
      fontSize: {
        body: [
          '24px',
          {
            lineHeight: '28px',
          },
        ],
        'body-small': [
          '16px',
          {
            lineHeight: '19.2px',
          },
        ],
        caption: [
          '14px',
          {
            lineHeight: '16.8px',
          },
        ],
      },
    },
  },
  plugins: [],
});
