import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useWindowStore } from '../../state/windowStore';
export function DesktopIcon({ project, index }) {
    const { openWindow } = useWindowStore();
    const [selected, setSelected] = useState(false);
    const ref = useRef(null);
    return (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("button", { ref: ref, className: `w-16 h-16 rounded-xl bg-white/10 hover:bg-white/20 focus:ring focus:outline-none ${selected ? 'ring-2 ring-blue-400' : ''}`, "aria-label": `${project.name} icon`, onClick: () => setSelected(true), onDoubleClick: () => openWindow({ id: project.slug, title: project.name, appType: 'project', payload: { project }, rect: { width: 820, height: 600, x: 200 + (index % 5) * 24, y: 160 + (index % 5) * 24 } }) }), _jsx("span", { className: "text-xs text-white/90 text-center max-w-[8rem] break-words", children: project.name })] }));
}
