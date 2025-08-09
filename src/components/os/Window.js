import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useWindowStore } from '../../state/windowStore';
export function Window({ win, children, contentTransparent = false, frameTransparent = false, resizable = true }) {
    const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindowStore();
    const ref = React.useRef(null);
    const [drag, setDrag] = React.useState(null);
    const [resize, setResize] = React.useState(null);
    const MIN_WIDTH = 360;
    const MIN_HEIGHT = 260;
    React.useEffect(() => {
        if (!drag)
            return;
        const onMove = (e) => {
            const dx = e.clientX - drag.startX;
            const dy = e.clientY - drag.startY;
            // Clamp to viewport
            const maxX = Math.max(0, window.innerWidth - win.rect.width);
            const maxY = Math.max(0, window.innerHeight - win.rect.height);
            const nextX = Math.min(Math.max(0, drag.startLeft + dx), maxX);
            const nextY = Math.min(Math.max(0, drag.startTop + dy), maxY);
            moveWindow(win.id, { x: nextX, y: nextY });
        };
        const onUp = () => setDrag(null);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [drag, moveWindow, win.id, win.rect.width, win.rect.height]);
    React.useEffect(() => {
        if (!resize)
            return;
        const onMove = (e) => {
            const dx = e.clientX - resize.startX;
            const dy = e.clientY - resize.startY;
            const maxWidth = Math.max(MIN_WIDTH, window.innerWidth - win.rect.x);
            const maxHeight = Math.max(MIN_HEIGHT, window.innerHeight - win.rect.y);
            const width = Math.min(Math.max(MIN_WIDTH, resize.startWidth + dx), maxWidth);
            const height = Math.min(Math.max(MIN_HEIGHT, resize.startHeight + dy), maxHeight);
            moveWindow(win.id, { width, height });
        };
        const onUp = () => setResize(null);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resize, moveWindow, win.id, win.rect.x, win.rect.y]);
    if (win.minimized)
        return null;
    // Use a slightly more compact titlebar when the frame is transparent,
    // to mimic the macOS Simulator spacing.
    const titlebarHeightRem = frameTransparent ? 1.4 : 2; // slight padding when transparent
    return (_jsxs("div", { ref: ref, role: "dialog", "aria-label": win.title, className: `fixed text-black dark:text-white rounded-mac overflow-hidden ${frameTransparent ? 'bg-transparent shadow-none border-none backdrop-blur-0' : 'bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-mac border border-white/10'}`, style: { left: win.rect.x, top: win.rect.y, width: win.rect.width, height: win.rect.height, zIndex: win.z }, onMouseDown: () => focusWindow(win.id), children: [_jsxs("div", { className: `flex items-center gap-2 px-3 ${frameTransparent ? 'bg-transparent backdrop-blur-0' : ''}`, style: { height: `${titlebarHeightRem}rem` }, onMouseDown: (e) => {
                    // Start drag on titlebar only
                    if (e.button !== 0)
                        return;
                    const el = ref.current;
                    if (!el)
                        return;
                    setDrag({ startX: e.clientX, startY: e.clientY, startLeft: win.rect.x, startTop: win.rect.y });
                }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { "aria-label": "Close", className: "w-3 h-3 rounded-full bg-red-500", onClick: () => closeWindow(win.id) }), _jsx("button", { "aria-label": "Minimize", className: "w-3 h-3 rounded-full bg-yellow-400", onClick: () => minimizeWindow(win.id) }), _jsx("button", { "aria-label": "Zoom", className: "w-3 h-3 rounded-full bg-green-500", onClick: () => { } })] }), _jsx("div", { className: "mx-auto text-sm select-none pointer-events-none", children: win.title })] }), _jsx("div", { className: `w-full overflow-auto ${contentTransparent ? '' : 'bg-black/5 dark:bg-black/20'}`, style: { height: `calc(100% - ${titlebarHeightRem}rem)` }, children: children }), resizable && (_jsx("div", { "aria-hidden": true, onMouseDown: (e) => {
                    if (e.button !== 0)
                        return;
                    setResize({ startX: e.clientX, startY: e.clientY, startWidth: win.rect.width, startHeight: win.rect.height });
                }, className: "absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize", style: {
                    // keep handle visible even on transparent frames
                    background: 'linear-gradient(135deg, transparent 0 40%, rgba(0,0,0,0.25) 40% 60%, transparent 60% 100%)',
                } }))] }));
}
