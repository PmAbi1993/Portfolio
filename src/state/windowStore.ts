import { create } from 'zustand';

export type WindowId = string; // usually project slug or app id

export type WindowRect = { x: number; y: number; width: number; height: number };

export type WindowState = {
  id: WindowId;
  title: string;
  rect: WindowRect;
  minimized: boolean;
  z: number;
  appType: 'finder' | 'project' | 'settings' | 'terminal' | 'safari';
  payload?: unknown;
};

type StoreState = {
  windows: Record<WindowId, WindowState>;
  order: WindowId[]; // z-order from back to front
  nextZ: number;
  openWindow: (win: Omit<WindowState, 'z' | 'minimized'> & Partial<Pick<WindowState, 'rect'>>) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, rect: Partial<WindowRect>) => void;
};

const STORAGE_KEY = 'portfolio_windows_v1';

function loadInitial(): Pick<StoreState, 'windows' | 'order' | 'nextZ'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { windows: {}, order: [], nextZ: 1 };
    const parsed = JSON.parse(raw);
    return {
      windows: parsed.windows ?? {},
      order: parsed.order ?? [],
      nextZ: parsed.nextZ ?? 1,
    };
  } catch {
    return { windows: {}, order: [], nextZ: 1 };
  }
}

export const useWindowStore = create<StoreState>((set, get) => ({
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
    const newWin: WindowState = {
      ...exists,
      id: win.id,
      title: win.title,
      rect,
      minimized: false,
      z,
      appType: win.appType,
      payload: win.payload,
    } as WindowState;
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
    if (!w) return;
    set({ windows: { ...windows, [id]: { ...w, minimized: true } } });
    persist();
  },
  restoreWindow: (id) => {
    const { windows, order, nextZ } = get();
    const w = windows[id];
    if (!w) return;
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
    if (!w) return;
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
    if (!w) return;
    const merged = { ...w.rect, ...rect };
    set({ windows: { ...windows, [id]: { ...w, rect: merged } } });
    throttledPersist();
  },
}));

function persist() {
  const { windows, order, nextZ } = useWindowStore.getState();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ windows, order, nextZ }));
  } catch {
    // ignore
  }
}

let persistTimer: number | undefined;
function throttledPersist() {
  if (persistTimer) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(persist, 200);
}


