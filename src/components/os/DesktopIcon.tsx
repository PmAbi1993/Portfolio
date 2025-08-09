import React, { useRef, useState } from 'react';
import { Project } from '../../data/projects';
import { useWindowStore } from '../../state/windowStore';

type Props = { project: Project; index: number };

export function DesktopIcon({ project, index }: Props): JSX.Element {
  const { openWindow } = useWindowStore();
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        ref={ref}
        className={`w-16 h-16 rounded-xl bg-white/10 hover:bg-white/20 focus:ring focus:outline-none ${selected ? 'ring-2 ring-blue-400' : ''}`}
        aria-label={`${project.name} icon`}
        onClick={() => setSelected(true)}
        onDoubleClick={() =>
          openWindow({ id: project.slug, title: project.name, appType: 'project', payload: { project }, rect: { width: 820, height: 600, x: 200 + (index % 5) * 24, y: 160 + (index % 5) * 24 } })
        }
      />
      <span className="text-xs text-white/90 text-center max-w-[8rem] break-words">{project.name}</span>
    </div>
  );
}


