import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: false,  // Disable publicDir since demo is a source directory
  build: {
    lib: {
      entry: resolve(__dirname, 'src/shutters-core.js'),
      name: 'ShuttersAccordion',
      fileName: (format) => `shutters.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        // Provide global variable name for UMD build
        globals: {},
        assetFileNames: (assetInfo) => {
          // Keep CSS files with simple names for npm package
          if (/\.css$/.test(assetInfo.name)) {
            return 'style.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    },
    // Enable CSS code splitting for separate core/theme files
    cssCodeSplit: true,
    // Use esbuild for fast minification
    minify: 'esbuild',
    // Optimize CSS minification
    cssMinify: 'esbuild',
    // Target modern browsers for better optimization
    target: 'es2020',
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096
  },
  css: {
    // PostCSS configuration for optimization
    postcss: {
      plugins: []
    },
    // CSS preprocessing options
    preprocessorOptions: {
      css: {
        // Ensure proper charset handling
        charset: false
      }
    }
  },
  server: {
    port: 3000,
    open: '/demo/index.html'  // Open demo page when dev server starts
  },
  // Optimize dependencies
  optimizeDeps: {
    include: []
  }
});