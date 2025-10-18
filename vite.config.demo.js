import { defineConfig } from 'vite';
import { resolve } from 'path';

// Vite config for building the demo site for GitHub Pages
export default defineConfig({
  root: 'demo',
  base: './', // Use relative paths for GitHub Pages
  publicDir: false,
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html')
      }
    },
    // Target modern browsers
    target: 'es2020',
    // Minify for production
    minify: 'esbuild',
    cssMinify: 'esbuild',
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 500
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
