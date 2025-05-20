import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/portfolio-terminal-ui-theme/', 
  plugins: [react()],
});
