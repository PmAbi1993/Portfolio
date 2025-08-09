import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Compass, Settings as SettingsIcon } from 'lucide-react';
import { useWindowStore } from '../../state/windowStore';
export function Dock() {
    const { openWindow, restoreWindow, windows } = useWindowStore();
    const [bounced, setBounced] = useState({});
    const dockRef = useRef(null);
    const items = [
        { id: 'finder', title: 'Finder', icon: _jsx(Compass, { size: 22, strokeWidth: 2.2, className: "block text-slate-800 dark:text-slate-100", "aria-hidden": true }), onClick: () => openWindow({ id: 'finder', title: 'About Me', appType: 'finder', rect: { width: 700, height: 520, x: 120, y: 120 } }) },
        { id: 'settings', title: 'Settings', icon: _jsx(SettingsIcon, { size: 22, strokeWidth: 2.2, className: "block text-slate-800 dark:text-slate-100", "aria-hidden": true }), onClick: () => openWindow({ id: 'settings', title: 'Settings', appType: 'settings', rect: { width: 560, height: 420, x: 180, y: 160 } }) },
    ];
    return (_jsx("div", { ref: dockRef, className: "fixed bottom-6 left-1/2 -translate-x-1/2", children: _jsx("div", { className: "glass rounded-2xl px-4 py-3 shadow-mac bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/10", role: "toolbar", "aria-label": "Dock", children: _jsx("ul", { className: "flex items-center gap-3", children: items.map((item) => {
                    const win = windows[item.id];
                    const isOpen = !!win && !win.minimized;
                    const isMinimized = !!win && win.minimized;
                    return (_jsxs("li", { className: "text-center relative h-14 grid place-items-center", children: [_jsxs("button", { className: `relative w-14 h-14 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-black/20 dark:hover:bg-black/30 transition-transform ring-1 ring-black/10 dark:ring-white/10 ${!bounced[item.id] ? 'bounce' : ''} grid place-items-center p-0`, "aria-label": item.title, onAnimationEnd: () => setBounced((b) => ({ ...b, [item.id]: true })), onClick: () => {
                                    if (isMinimized)
                                        restoreWindow(item.id);
                                    else
                                        item.onClick();
                                }, children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-white/90 dark:bg-white/10 grid place-items-center ring-1 ring-black/10 dark:ring-white/10", children: item.icon }), (isOpen || isMinimized) && _jsx("div", { className: "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[2px]", "aria-hidden": true, children: _jsx("div", { className: "mx-auto w-2 h-1 rounded bg-black/70 dark:bg-white/90" }) })] })] }, item.id));
                }) }) }) }));
}
