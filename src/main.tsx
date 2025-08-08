import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Desktop } from './components/os/Desktop.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Desktop />);
}


