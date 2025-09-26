import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            // Separate core and theme CSS files for better caching
            if (assetInfo.name.includes('shutters-core')) {
              return `css/shutters-core.[hash].${extType}`;
            }
            if (assetInfo.name.includes('shutters-theme')) {
              return `css/shutters-theme.[hash].${extType}`;
            }
            return `css/[name].[hash].${extType}`;
          }
          return `assets/[name].[hash].${extType}`;
        },
        // Optimize chunk splitting for better caching
        manualChunks: (id) => {
          if (id.includes('shutters-core.css')) {
            return 'shutters-core';
          }
          if (id.includes('shutters-theme.css')) {
            return 'shutters-theme';
          }
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
    open: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: []
  }
});