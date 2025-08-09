import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useWindowStore } from '../../state/windowStore';
import { Window } from './Window';
import { FinderAboutMe } from '../../apps/FinderAboutMe';
import { SettingsWindow } from '../../apps/SettingsWindow';
import { ProjectWindow } from '../../apps/ProjectWindow';
import { IosSimulator } from '../../apps/IosSimulator';
export function WindowManager() {
    const { windows, order } = useWindowStore();
    const sorted = [...order]
        .map((id) => windows[id])
        .filter((w) => Boolean(w))
        .sort((a, b) => (a?.z ?? 0) - (b?.z ?? 0));
    return (_jsx(_Fragment, { children: sorted.map((w) => {
            return (_jsxs(Window, { win: w, contentTransparent: w.appType === 'ios-simulator', frameTransparent: w.appType === 'ios-simulator', resizable: w.appType !== 'ios-simulator', children: [w.appType === 'finder' && _jsx(FinderAboutMe, {}), w.appType === 'settings' && _jsx(SettingsWindow, {}), w.appType === 'project' && (_jsx(ProjectWindow, { project: w.payload.project })), w.appType === 'ios-simulator' && _jsx(IosSimulator, {})] }, w.id));
        }) }));
}
