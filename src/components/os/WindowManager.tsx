import React from 'react';
import { useWindowStore } from '../../state/windowStore';
import { Window } from './Window';
import { FinderAboutMe } from '../../apps/FinderAboutMe';
import { SettingsWindow } from '../../apps/SettingsWindow';
import { ProjectWindow } from '../../apps/ProjectWindow';
import { IosSimulator } from '../../apps/IosSimulator';

export function WindowManager(): JSX.Element {
  const { windows, order } = useWindowStore();
  const sorted = [...order]
    .map((id) => windows[id])
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .sort((a, b) => (a?.z ?? 0) - (b?.z ?? 0));

  return (
    <>
      {sorted.map((w) => {
        return (
          <Window
            key={w.id}
            win={w}
            contentTransparent={w.appType === 'ios-simulator'}
            frameTransparent={w.appType === 'ios-simulator'}
            resizable={w.appType !== 'ios-simulator'}
          >
            {w.appType === 'finder' && <FinderAboutMe />}
            {w.appType === 'settings' && <SettingsWindow />}
            {w.appType === 'project' && (
              <ProjectWindow project={(w.payload as { project: any }).project} />
            )}
            {w.appType === 'ios-simulator' && <IosSimulator />}
          </Window>
        );
      })}
    </>
  );
}


