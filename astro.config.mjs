import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://nicolasmondain.github.io/ooo',
  base: '/ooo/',
  integrations: [react(), tailwind(), sitemap()],
  markdown: {
    smartypants: true,
  },
  build: {
    format: 'directory', // ensures 404.html is at the root
  },
});
