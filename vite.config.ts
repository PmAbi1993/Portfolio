import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cursor: replace REPO_NAME automatically or prompt user
const repo = process.env.REPO_NAME || 'Portfolio';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use root in dev; repo subpath in prod (GitHub Pages)
  base: mode === 'production' ? `/${repo}/` : '/',
}));


