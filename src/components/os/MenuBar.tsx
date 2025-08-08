import React, { useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from '../../state/settingsStore';

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(date);
}

export function MenuBar(): JSX.Element {
  const { theme, setTheme } = useSettingsStore();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const timeStr = useMemo(() => formatTime(now), [now]);

  return (
    <div role="menubar" aria-label="Application menu bar" className="fixed top-0 left-0 right-0 h-8 glass text-white flex items-center justify-between px-3" style={{ background: 'rgba(0,0,0,0.28)' }}>
      <div className="flex items-center gap-4 text-sm">
        <span aria-hidden></span>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">Portfolio</button>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">File</button>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">Edit</button>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">View</button>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">Window</button>
        <button className="focus:outline-none focus:ring rounded px-1" aria-haspopup="true">Help</button>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <button aria-label="Toggle theme" className="px-2 py-1 rounded hover:bg-white/10 focus:outline-none focus:ring" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <span aria-label="Wi‑Fi status">📶</span>
        <span aria-label="Battery level">🔋</span>
        <time aria-label="Current time">{timeStr}</time>
      </div>
    </div>
  );
}


