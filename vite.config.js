import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@data': resolve(__dirname, 'src/data'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@context': resolve(__dirname, 'src/context'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/feedback-sync': {
        target: 'https://keyvalue.immanuel.co/api/KeyVal',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/feedback-sync/, ''),
      },
    },
  },
});
