/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-to-bg': 'linear-gradient(to bottom, #eef8fd, #fff)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bg-image-1': "url('/public/images/img8.jpg')",
        'bg-home-1': "url('/public/images/bgimg1.png')",
        'bg-chat-1': "url('/public/images/chat1.jpg')",
        'bg-white': 'linear-gradient(to bottom, #fff, #fff)',
      },

      screens: {
        sm0: { min: '400px' },
        sm1: { min: '700px' },
        sm: { min: '850px' },
        md: { min: '1100px' },
        mds: { min: '1200px' },
        md0: { min: '1450px' },
        md1: { min: '1600px' },
        xl: { min: '2200px' },
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
