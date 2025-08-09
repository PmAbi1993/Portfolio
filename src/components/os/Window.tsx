import * as React from 'react';
import { WindowState, useWindowStore } from '../../state/windowStore';

type Props = {
  win: WindowState;
  children: React.ReactNode;
  contentTransparent?: boolean;
  frameTransparent?: boolean; // makes the window body clear like macOS Simulator
};

export function Window({ win, children, contentTransparent = false, frameTransparent = false }: Props): JSX.Element | null {
  const { closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindowStore();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = React.useState<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null);

  React.useEffect(() => {
    if (!drag) return;
    const onMove = (e: MouseEvent) => {
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

  if (win.minimized) return null;

  // Use a slightly more compact titlebar when the frame is transparent,
  // to mimic the macOS Simulator spacing.
  const titlebarHeightRem = frameTransparent ? 1.4 : 2; // slight padding when transparent

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={win.title}
      className={`fixed text-black dark:text-white rounded-mac overflow-hidden ${
        frameTransparent ? 'bg-transparent shadow-none border-none backdrop-blur-0' : 'bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-mac border border-white/10'
      }`}
      style={{ left: win.rect.x, top: win.rect.y, width: win.rect.width, height: win.rect.height, zIndex: win.z }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className={`flex items-center gap-2 px-3 ${frameTransparent ? 'bg-transparent backdrop-blur-0' : ''}`}
        style={{ height: `${titlebarHeightRem}rem` }}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          // Start drag on titlebar only
          if (e.button !== 0) return;
          const el = ref.current;
          if (!el) return;
          setDrag({ startX: e.clientX, startY: e.clientY, startLeft: win.rect.x, startTop: win.rect.y });
        }}
      >
        <div className="flex items-center gap-2">
          <button aria-label="Close" className="w-3 h-3 rounded-full bg-red-500" onClick={() => closeWindow(win.id)} />
          <button aria-label="Minimize" className="w-3 h-3 rounded-full bg-yellow-400" onClick={() => minimizeWindow(win.id)} />
          <button aria-label="Zoom" className="w-3 h-3 rounded-full bg-green-500" onClick={() => { /* TODO: maximize */ }} />
        </div>
        <div className="mx-auto text-sm select-none pointer-events-none">{win.title}</div>
      </div>
      <div
        className={`w-full overflow-auto ${contentTransparent ? '' : 'bg-black/5 dark:bg-black/20'}`}
        style={{ height: `calc(100% - ${titlebarHeightRem}rem)` }}
      >
        {children}
      </div>
    </div>
  );
}


