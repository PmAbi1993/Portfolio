import React, { useRef, useState } from 'react';
import { Compass, Settings as SettingsIcon } from 'lucide-react';
import { useWindowStore } from '../../state/windowStore';

type DockItem = { id: string; title: string; onClick: () => void; icon: JSX.Element };

export function Dock(): JSX.Element {
  const { openWindow, restoreWindow, windows } = useWindowStore();
  const [bounced, setBounced] = useState<Record<string, boolean>>({});
  const dockRef = useRef<HTMLDivElement | null>(null);

  const items: DockItem[] = [
    {
      id: 'finder',
      title: 'Finder',
      icon: <Compass size={22} strokeWidth={2.2} className="block text-slate-800 dark:text-slate-100" aria-hidden />,
      onClick: () => openWindow({ id: 'finder', title: 'About Me', appType: 'finder', rect: { width: 700, height: 520, x: 120, y: 120 } }),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <SettingsIcon size={22} strokeWidth={2.2} className="block text-slate-800 dark:text-slate-100" aria-hidden />,
      onClick: () => openWindow({ id: 'settings', title: 'Settings', appType: 'settings', rect: { width: 560, height: 420, x: 180, y: 160 } }),
    },
  ];

  return (
    <div ref={dockRef} className="fixed bottom-6 left-1/2 -translate-x-1/2">
      <div className="glass rounded-2xl px-4 py-3 shadow-mac bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/10" role="toolbar" aria-label="Dock">
        <ul className="flex items-center gap-3">
          {items.map((item) => {
            const win = windows[item.id];
            const isOpen = !!win && !win.minimized;
            const isMinimized = !!win && win.minimized;
            return (
              <li key={item.id} className="text-center relative h-14 grid place-items-center">
                <button
                  className={`relative w-14 h-14 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-black/20 dark:hover:bg-black/30 transition-transform ring-1 ring-black/10 dark:ring-white/10 ${!bounced[item.id] ? 'bounce' : ''} grid place-items-center p-0`}
                  aria-label={item.title}
                  onAnimationEnd={() => setBounced((b) => ({ ...b, [item.id]: true }))}
                  onClick={() => {
                    if (isMinimized) restoreWindow(item.id);
                    else item.onClick();
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-white/10 grid place-items-center ring-1 ring-black/10 dark:ring-white/10">
                    {item.icon}
                  </div>
                  {(isOpen || isMinimized) && (
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[2px]" aria-hidden>
                      <div className="mx-auto w-2 h-1 rounded bg-black/70 dark:bg-white/90" />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


