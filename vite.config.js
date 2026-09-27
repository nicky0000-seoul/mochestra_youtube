import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mochestra_youtube/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
});
