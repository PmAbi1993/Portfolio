import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '../../state/windowStore';
export function Window({ win, children }) {
    const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindowStore();
    const ref = useRef(null);
    const [drag, setDrag] = useState(null);
    useEffect(() => {
        if (!drag)
            return;
        const onMove = (e) => {
            const dx = e.clientX - drag.startX;
            const dy = e.clientY - drag.startY;
            moveWindow(win.id, { x: drag.startLeft + dx, y: drag.startTop + dy });
        };
        const onUp = () => setDrag(null);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [drag, moveWindow, win.id]);
    if (win.minimized)
        return null;
    return (_jsxs("div", { ref: ref, role: "dialog", "aria-label": win.title, className: "fixed bg-white/80 dark:bg-black/60 backdrop-blur-md text-black dark:text-white rounded-mac shadow-mac border border-white/10 overflow-hidden", style: { left: win.rect.x, top: win.rect.y, width: win.rect.width, height: win.rect.height, zIndex: win.z }, onMouseDown: () => focusWindow(win.id), children: [_jsxs("div", { className: "h-8 flex items-center gap-2 px-3", onMouseDown: (e) => {
                    // Start drag on titlebar only
                    if (e.button !== 0)
                        return;
                    const el = ref.current;
                    if (!el)
                        return;
                    setDrag({ startX: e.clientX, startY: e.clientY, startLeft: win.rect.x, startTop: win.rect.y });
                }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { "aria-label": "Close", className: "w-3 h-3 rounded-full bg-red-500", onClick: () => closeWindow(win.id) }), _jsx("button", { "aria-label": "Minimize", className: "w-3 h-3 rounded-full bg-yellow-400", onClick: () => minimizeWindow(win.id) }), _jsx("button", { "aria-label": "Zoom", className: "w-3 h-3 rounded-full bg-green-500", onClick: () => { } })] }), _jsx("div", { className: "mx-auto text-sm select-none pointer-events-none", children: win.title })] }), _jsx("div", { className: "w-full h-[calc(100%-2rem)] bg-black/5 dark:bg-black/20 overflow-auto", children: children })] }));
}
