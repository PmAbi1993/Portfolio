# macOS‑style Portfolio

Single‑page portfolio that mimics macOS desktop (menu bar, Dock, draggable icons, resizable windows) and opens projects as app windows. Built with React, TypeScript, Vite, Tailwind, Zustand.

## Scripts

- `pnpm dev` – start dev server
- `pnpm build` – typecheck + build
- `pnpm preview` – preview built app

## Deploy to GitHub Pages

This repo includes a Pages workflow at `.github/workflows/deploy.yml`. Ensure your default branch is `main`, then push to trigger build and deploy. Vite `base` is set from the repo name at build time.

## Keyboard Shortcuts (initial)

- Cmd+W – close focused window
- Cmd+M – minimize focused window
- Cmd+, – open Settings
- Enter – open selected icon
- Esc – close menus/windows


