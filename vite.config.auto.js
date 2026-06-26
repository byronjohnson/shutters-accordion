import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'auto.js'),
      name: 'ShuttersAuto',
      fileName: (format) => `shutters.auto.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
  },
});
