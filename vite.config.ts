import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Configure for GitHub Pages deployment
  // Change 'ooo' to your repository name
  base: process.env.GITHUB_PAGES ? '/ooo/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
