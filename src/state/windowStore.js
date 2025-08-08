import { create } from 'zustand';
const STORAGE_KEY = 'portfolio_windows_v1';
function loadInitial() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return { windows: {}, order: [], nextZ: 1 };
        const parsed = JSON.parse(raw);
        return {
            windows: parsed.windows ?? {},
            order: parsed.order ?? [],
            nextZ: parsed.nextZ ?? 1,
        };
    }
    catch {
        return { windows: {}, order: [], nextZ: 1 };
    }
}
export const useWindowStore = create((set, get) => ({
    ...loadInitial(),
    openWindow: (win) => {
        const state = get();
        const exists = state.windows[win.id];
        const z = state.nextZ;
        const rect = {
            width: win.rect?.width ?? 680,
            height: win.rect?.height ?? 480,
            x: win.rect?.x ?? 80 + Math.min(state.order.length * 24, 120),
            y: win.rect?.y ?? 120 + Math.min(state.order.length * 24, 120),
        };
        const newWin = {
            ...exists,
            id: win.id,
            title: win.title,
            rect,
            minimized: false,
            z,
            appType: win.appType,
            payload: win.payload,
        };
        const windows = { ...state.windows, [win.id]: newWin };
        const order = [...state.order.filter((i) => i !== win.id), win.id];
        set({ windows, order, nextZ: z + 1 });
        persist();
    },
    closeWindow: (id) => {
        const { windows, order } = get();
        const { [id]: _, ...rest } = windows;
        set({ windows: rest, order: order.filter((i) => i !== id) });
        persist();
    },
    minimizeWindow: (id) => {
        const { windows } = get();
        const w = windows[id];
        if (!w)
            return;
        set({ windows: { ...windows, [id]: { ...w, minimized: true } } });
        persist();
    },
    restoreWindow: (id) => {
        const { windows, order, nextZ } = get();
        const w = windows[id];
        if (!w)
            return;
        set({
            windows: { ...windows, [id]: { ...w, minimized: false, z: nextZ } },
            order: [...order.filter((i) => i !== id), id],
            nextZ: nextZ + 1,
        });
        persist();
    },
    focusWindow: (id) => {
        const { windows, order, nextZ } = get();
        const w = windows[id];
        if (!w)
            return;
        set({
            windows: { ...windows, [id]: { ...w, z: nextZ } },
            order: [...order.filter((i) => i !== id), id],
            nextZ: nextZ + 1,
        });
        persist();
    },
    moveWindow: (id, rect) => {
        const { windows } = get();
        const w = windows[id];
        if (!w)
            return;
        const merged = { ...w.rect, ...rect };
        set({ windows: { ...windows, [id]: { ...w, rect: merged } } });
        throttledPersist();
    },
}));
function persist() {
    const { windows, order, nextZ } = useWindowStore.getState();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ windows, order, nextZ }));
    }
    catch {
        // ignore
    }
}
let persistTimer;
function throttledPersist() {
    if (persistTimer)
        window.clearTimeout(persistTimer);
    persistTimer = window.setTimeout(persist, 200);
}
