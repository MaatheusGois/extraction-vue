import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/extraction-vue/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://sol.sbc.org.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/busca/index.php/integrada/results'),
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://sol.sbc.org.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/busca/index.php/integrada/results'),
      },
    },
  },
};
