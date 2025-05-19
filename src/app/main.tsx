import { createRoot } from 'react-dom/client';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { App } from './App';
// Renderização do aplicativo
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
