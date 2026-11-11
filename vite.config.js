import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves from /car-dealership/; Vercel serves from the domain root.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/car-dealership/',
});
