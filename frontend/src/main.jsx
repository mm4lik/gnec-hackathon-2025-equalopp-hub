// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Context Providers
import { UserProvider } from './context/UserContext.jsx';

// Main App Component
import App from './App.jsx';

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);