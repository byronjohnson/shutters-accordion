import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'ShuttersAccordion',
      fileName: (format) => `shutters.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: () => 'core.css',
      },
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
});
