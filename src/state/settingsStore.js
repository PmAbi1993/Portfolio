import { create } from 'zustand';
const STORAGE_KEY = 'portfolio_settings_v1';
function loadInitial() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return { theme: 'dark', wallpaperIndex: 0, scale: 1 };
        const parsed = JSON.parse(raw);
        return {
            theme: parsed.theme === 'light' ? 'light' : 'dark',
            wallpaperIndex: Number.isFinite(parsed.wallpaperIndex) ? parsed.wallpaperIndex : 0,
            scale: parsed.scale === 1.25 || parsed.scale === 1.5 ? parsed.scale : 1,
        };
    }
    catch {
        return { theme: 'dark', wallpaperIndex: 0, scale: 1 };
    }
}
export const useSettingsStore = create((set, get) => ({
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
    }
    catch {
        // ignore
    }
}
