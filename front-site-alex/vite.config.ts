import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Generate bundle analysis report
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable source maps for production debugging
    sourcemap: false,

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Simplified chunk splitting to avoid dependency issues
        manualChunks: {
          // Single vendor chunk for all node_modules to ensure proper loading order
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
            '@sentry/react',
            '@vercel/speed-insights',
          ],
        },

        // Naming strategy for chunks
        chunkFileNames: 'assets/[name]-[hash].js',

        // Entry file naming
        entryFileNames: 'assets/[name]-[hash].js',

        // Asset file naming
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Minification options
    minify: 'esbuild',

    // Target modern browsers for smaller output
    target: 'es2015',
  },
}));
