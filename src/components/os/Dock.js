import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useWindowStore } from '../../state/windowStore';
export function Dock() {
    const { openWindow, restoreWindow, windows } = useWindowStore();
    const [bounced, setBounced] = useState({});
    const dockRef = useRef(null);
    const items = [
        { id: 'finder', title: 'Finder', emoji: '🧭', onClick: () => openWindow({ id: 'finder', title: 'About Me', appType: 'finder', rect: { width: 700, height: 520, x: 120, y: 120 } }) },
        { id: 'settings', title: 'Settings', emoji: '⚙️', onClick: () => openWindow({ id: 'settings', title: 'Settings', appType: 'settings', rect: { width: 560, height: 420, x: 180, y: 160 } }) },
    ];
    return (_jsx("div", { ref: dockRef, className: "fixed bottom-6 left-1/2 -translate-x-1/2", children: _jsx("div", { className: "glass rounded-2xl px-3 py-2 shadow-mac bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/10", role: "toolbar", "aria-label": "Dock", children: _jsx("ul", { className: "flex items-end gap-3", children: items.map((item) => {
                    const win = windows[item.id];
                    const isOpen = !!win && !win.minimized;
                    const isMinimized = !!win && win.minimized;
                    return (_jsxs("li", { className: "text-center", children: [_jsx("button", { className: `w-14 h-14 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-black/20 dark:hover:bg-black/30 text-2xl transition-transform ring-1 ring-black/10 dark:ring-white/10 ${!bounced[item.id] ? 'bounce' : ''}`, "aria-label": item.title, onAnimationEnd: () => setBounced((b) => ({ ...b, [item.id]: true })), onClick: () => {
                                    if (isMinimized)
                                        restoreWindow(item.id);
                                    else
                                        item.onClick();
                                }, children: _jsx("span", { "aria-hidden": true, children: item.emoji }) }), _jsx("div", { className: "h-1 mt-1", children: (isOpen || isMinimized) && _jsx("div", { className: "mx-auto w-2 h-1 rounded bg-black/70 dark:bg-white/90", "aria-hidden": true }) })] }, item.id));
                }) }) }) }));
}
