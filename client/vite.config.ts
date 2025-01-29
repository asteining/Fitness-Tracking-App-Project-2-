import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 10000,
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://fitness-tracking-app-project-2.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://fitness-tracking-app-project-2.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
