import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'gsap-vendor': ['gsap'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'zustand'],
          'i18n-vendor': ['i18next', 'react-i18next'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
