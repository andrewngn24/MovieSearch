import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'html',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'html/index.html'),
        watchlist: resolve(__dirname, 'html/watchlist.html'),
      },
    },
  },
});