import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n/config';

// Import tactile Denim & Industrial Craft design tokens & styles
import './styles/variables.css';
import './styles/denim-texture.css';
import './styles/theme.css';
import './styles/components.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
