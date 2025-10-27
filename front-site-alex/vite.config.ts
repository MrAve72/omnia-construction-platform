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
        // Manual chunk splitting strategy
        manualChunks: (id) => {
          // Vendor chunk for core React ecosystem
          if (id.includes('node_modules')) {
            // React core and DOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }

            // React Router
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }

            // State management (Redux, React Query)
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') || id.includes('@tanstack/react-query')) {
              return 'vendor-state';
            }

            // UI libraries - Radix UI components (largest dependency group)
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }

            // UI libraries - Mantine
            if (id.includes('@mantine')) {
              return 'vendor-mantine';
            }

            // Chart libraries
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }

            // Form handling
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-forms';
            }

            // Icons
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }

            // Monitoring and analytics
            if (id.includes('@sentry') || id.includes('@vercel/speed-insights')) {
              return 'vendor-monitoring';
            }

            // Date utilities
            if (id.includes('date-fns') || id.includes('react-day-picker')) {
              return 'vendor-date';
            }

            // Other utilities and smaller libraries
            if (id.includes('node_modules')) {
              return 'vendor-utils';
            }
          }
        },

        // Naming strategy for chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name]-[hash].js`;
        },

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
