import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cursor: replace REPO_NAME automatically or prompt user
// Fallback must exactly match the GitHub repo name (case-sensitive)
const repo = process.env.REPO_NAME || 'PortFolio';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use root in dev; repo subpath in prod (GitHub Pages)
  base: mode === 'production' ? `/${repo}/` : '/',
}));


