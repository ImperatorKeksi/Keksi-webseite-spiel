import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory
  root: './',
  
  // Base public path
  base: './',
  
  // Server configuration
  server: {
    port: 3000,
    open: '/START.html',
    cors: true,
    strictPort: false,
    // Middleware to handle script loading
    middlewareMode: false,
  },
  
  // Optimize deps (skip for now to prevent issues)
  optimizeDeps: {
    exclude: ['javascript/*'],
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    
    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'START.html'),
        game: resolve(__dirname, 'seiten/game.html'),
        index: resolve(__dirname, 'seiten/index.html'),
      },
    },
    
    // Terser options for minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    chunkSizeWarningLimit: 1000,
  },
  
  // Don't transform script tags
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
});
