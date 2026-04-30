import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { visualizer } from 'rollup-plugin-visualizer';
import fs from 'fs';
import path from 'path';

// Check if SSL certificates exist
const sslKeyPath = path.resolve(__dirname, 'ssl/certs/server-key.pem');
const sslCertPath = path.resolve(__dirname, 'ssl/certs/server-cert.pem');
const hasSSL = fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // @supabase/node-fetch declares "browser": "./browser.js" but npm package omits that file; Vite fails to resolve.
    alias: {
      '@supabase/node-fetch': path.resolve(__dirname, 'src/shims/supabase-node-fetch.ts'),
    },
  },
  plugins: [
    mdx({ remarkPlugins: [remarkGfm] }),
    react(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Performance budgets
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'utils-vendor': ['@supabase/supabase-js'],
        },
        // Asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Bundle size limits
    chunkSizeWarningLimit: 1000, // 1MB warning
    // Enable source maps for debugging
    sourcemap: false, // Disable in production for better performance
    // Minify and optimize
    minify: 'esbuild', // Use esbuild instead of terser
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
  },
  // Server optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  // CSS optimizations
  css: {
    devSourcemap: false, // Disable source maps in development
  },
  preview: {
    host: true,
    port: 4173,
    ...(hasSSL && {
      https: {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath),
      }
    })
  }
});