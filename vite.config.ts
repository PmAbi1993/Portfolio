import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cursor: replace REPO_NAME automatically or prompt user
const repo = process.env.REPO_NAME || 'Portfolio';

export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`,
});


