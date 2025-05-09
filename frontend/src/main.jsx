// Importing necessary modules from React
import { StrictMode } from 'react'  // StrictMode helps with detecting potential problems in the app during development
import { createRoot } from 'react-dom/client'  // createRoot is used to initialize the React app in the root DOM element

// Importing global CSS styles for the app
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import App from './App.jsx'

// Creating a root React element, binding it to the DOM element with the id of 'root'
createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
    </UserProvider>
)
