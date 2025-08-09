import React, { useRef, useState } from 'react';
import { useWindowStore } from '../../state/windowStore';

type DockItem = { id: string; title: string; emoji: string; onClick: () => void };

export function Dock(): JSX.Element {
  const { openWindow, restoreWindow, windows } = useWindowStore();
  const [bounced, setBounced] = useState<Record<string, boolean>>({});
  const dockRef = useRef<HTMLDivElement | null>(null);

  const items: DockItem[] = [
    { id: 'finder', title: 'Finder', emoji: '🧭', onClick: () => openWindow({ id: 'finder', title: 'About Me', appType: 'finder', rect: { width: 700, height: 520, x: 120, y: 120 } }) },
    { id: 'settings', title: 'Settings', emoji: '⚙️', onClick: () => openWindow({ id: 'settings', title: 'Settings', appType: 'settings', rect: { width: 560, height: 420, x: 180, y: 160 } }) },
  ];

  return (
    <div ref={dockRef} className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="glass rounded-2xl px-3 py-2 shadow-mac bg-white/40 dark:bg-black/50" role="toolbar" aria-label="Dock">
        <ul className="flex items-end gap-3">
          {items.map((item) => {
            const win = windows[item.id];
            const isOpen = !!win && !win.minimized;
            const isMinimized = !!win && win.minimized;
            return (
              <li key={item.id} className="text-center">
                <button
                  className={`w-14 h-14 rounded-xl bg-black/20 hover:bg-black/30 text-2xl transition-transform ${!bounced[item.id] ? 'bounce' : ''}`}
                  aria-label={item.title}
                  onAnimationEnd={() => setBounced((b) => ({ ...b, [item.id]: true }))}
                  onClick={() => {
                    if (isMinimized) restoreWindow(item.id);
                    else item.onClick();
                  }}
                >
                  <span aria-hidden>{item.emoji}</span>
                </button>
                <div className="h-1 mt-1">
                  {(isOpen || isMinimized) && <div className="mx-auto w-2 h-1 rounded bg-black/70 dark:bg-white/90" aria-hidden />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


