import React, { useEffect, useMemo } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { projects } from '../../data/projects';
import { useSettingsStore } from '../../state/settingsStore';

export function Desktop(): JSX.Element {
  const { wallpaperIndex, theme, scale } = useSettingsStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.setProperty('--scale', String(scale));
  }, [theme, scale]);

  const wallpaperUrl = useMemo(() => `wallpapers/wallpaper-${wallpaperIndex % 3}.jpg`, [wallpaperIndex]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className="fixed inset-0 bg-black"
        style={{ backgroundImage: `url(${wallpaperUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-hidden
      />
      <MenuBar />
      <WindowManager />
      <div className="absolute inset-0 pt-8 pb-20 px-4 select-none">
        <div className="grid grid-cols-6 gap-4 lg:grid-cols-10 xl:grid-cols-12">
          {projects.map((p, idx) => (
            <DesktopIcon key={p.slug} project={p} index={idx} />
          ))}
        </div>
      </div>
      <Dock />
    </div>
  );
}


