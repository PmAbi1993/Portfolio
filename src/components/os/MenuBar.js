import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from '../../state/settingsStore';
function formatTime(date) {
    return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(date);
}
export function MenuBar() {
    const { theme, setTheme } = useSettingsStore();
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(t);
    }, []);
    const timeStr = useMemo(() => formatTime(now), [now]);
    return (_jsxs("div", { role: "menubar", "aria-label": "Application menu bar", className: "fixed top-0 left-0 right-0 h-8 glass text-white flex items-center justify-between px-3", style: { background: 'rgba(0,0,0,0.28)' }, children: [_jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsx("span", { "aria-hidden": true, children: "\uF8FF" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "Portfolio" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "File" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "Edit" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "View" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "Window" }), _jsx("button", { className: "focus:outline-none focus:ring rounded px-1", "aria-haspopup": "true", children: "Help" })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx("button", { "aria-label": "Toggle theme", className: "px-2 py-1 rounded hover:bg-white/10 focus:outline-none focus:ring", onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'), children: theme === 'dark' ? '🌙' : '☀️' }), _jsx("span", { "aria-label": "Wi\u2011Fi status", children: "\uD83D\uDCF6" }), _jsx("span", { "aria-label": "Battery level", children: "\uD83D\uDD0B" }), _jsx("time", { "aria-label": "Current time", children: timeStr })] })] }));
}
