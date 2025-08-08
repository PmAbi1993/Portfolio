import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

export type SettingsState = {
  theme: ThemeMode;
  wallpaperIndex: number;
  scale: 1 | 1.25 | 1.5;
  setTheme: (t: ThemeMode) => void;
  setWallpaperIndex: (i: number) => void;
  setScale: (s: 1 | 1.25 | 1.5) => void;
};

const STORAGE_KEY = 'portfolio_settings_v1';

function loadInitial(): Pick<SettingsState, 'theme' | 'wallpaperIndex' | 'scale'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { theme: 'dark', wallpaperIndex: 0, scale: 1 };
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      wallpaperIndex: Number.isFinite(parsed.wallpaperIndex) ? parsed.wallpaperIndex : 0,
      scale: parsed.scale === 1.25 || parsed.scale === 1.5 ? parsed.scale : 1,
    } as const;
  } catch {
    return { theme: 'dark', wallpaperIndex: 0, scale: 1 };
  }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...loadInitial(),
  setTheme: (t) => {
    set({ theme: t });
    persist();
  },
  setWallpaperIndex: (i) => {
    set({ wallpaperIndex: i });
    persist();
  },
  setScale: (s) => {
    set({ scale: s });
    persist();
  },
}));

function persist() {
  const { theme, wallpaperIndex, scale } = useSettingsStore.getState();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, wallpaperIndex, scale }));
  } catch {
    // ignore
  }
}


