import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 8935,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Keep Vite's hashed bundle output out of /assets, which is reserved for
    // the verbatim CDN-mirrored content under public/assets.
    assetsDir: 'app',
  },
});
