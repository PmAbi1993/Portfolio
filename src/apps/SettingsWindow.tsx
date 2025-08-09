import React from 'react';
import { useSettingsStore } from '../state/settingsStore';

export function SettingsWindow(): JSX.Element {
  const { theme, setTheme, wallpaperIndex, setWallpaperIndex, scale, setScale } = useSettingsStore();

  return (
    <div className="p-4 text-black dark:text-white space-y-6">
      <section>
        <h2 className="font-semibold mb-2">Appearance</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} /> Light
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} /> Dark
          </label>
        </div>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Wallpaper</h2>
        <div className="flex items-center gap-3">
          {[0,1,2].map((i) => (
            <button key={i} className={`w-20 h-12 rounded bg-white/70 dark:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-sm ${wallpaperIndex===i?'ring-2 ring-blue-400':''}`} onClick={() => setWallpaperIndex(i)} aria-label={`Wallpaper ${i+1}`} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Scale</h2>
        <div className="flex items-center gap-3">
          {[1, 1.25, 1.5].map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input type="radio" name="scale" value={s} checked={scale === s} onChange={() => setScale(s as 1 | 1.25 | 1.5)} /> {Math.round(s*100)}%
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}


