// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // پوشه خروجی
    emptyOutDir: true, // خالی کردن پوشه خروجی قبل از ساخت
  },
});
