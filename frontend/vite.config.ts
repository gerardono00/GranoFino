// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Asegúrate de que NO HAY ninguna sección 'css: {}' o importaciones de 'tailwindcss' o 'autoprefixer'
});