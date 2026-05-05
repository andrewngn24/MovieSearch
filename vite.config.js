import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        search: resolve(__dirname, 'html/search.html'),
        watchlist: resolve(__dirname, 'html/watchlist.html')
      }
    }
  }
});