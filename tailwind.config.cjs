/* eslint-env node */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f172a'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')]
};
