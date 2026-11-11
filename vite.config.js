import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /car-dealership/ — keep absolute
  // so assets resolve from nested routes like /car-dealership/inventory/:slug
  base: '/car-dealership/',
});
