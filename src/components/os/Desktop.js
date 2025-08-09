import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { projects } from '../../data';
import { useSettingsStore } from '../../state/settingsStore';
export function Desktop() {
    const { wallpaperIndex, theme, scale } = useSettingsStore();
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.setProperty('--scale', String(scale));
    }, [theme, scale]);
    const wallpaperUrl = useMemo(() => `wallpapers/wallpaper-${wallpaperIndex % 3}.jpg`, [wallpaperIndex]);
    return (_jsxs("div", { className: "h-full w-full overflow-hidden bg-white dark:bg-black", children: [_jsx("div", { className: "fixed inset-0", style: { backgroundImage: `url(${wallpaperUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }, "aria-hidden": true }), _jsx(MenuBar, {}), _jsx(WindowManager, {}), _jsx("div", { className: "absolute left-0 right-0 bottom-0 top-12 px-4 select-none", children: _jsx("div", { className: "grid grid-cols-6 gap-4 lg:grid-cols-10 xl:grid-cols-12", children: projects.map((p, idx) => (_jsx(DesktopIcon, { project: p, index: idx }, p.slug))) }) }), _jsx(Dock, {})] }));
}
