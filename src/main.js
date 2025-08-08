import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Desktop } from './components/os/Desktop';
const root = document.getElementById('root');
if (root) {
    createRoot(root).render(_jsx(Desktop, {}));
}
