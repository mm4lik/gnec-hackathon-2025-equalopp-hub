// Importing necessary modules from React
import { StrictMode } from 'react'  // StrictMode helps with detecting potential problems in the app during development
import { createRoot } from 'react-dom/client'  // createRoot is used to initialize the React app in the root DOM element

// Importing global CSS styles for the app
import './index.css'

// Importing the main App component that will render the app's content
import App from './App.jsx'

// Creating a root React element, binding it to the DOM element with the id of 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* StrictMode is a development-only tool for highlighting potential problems in an app */}
    <App /> {/* The App component is the main entry point for the application */}
  </StrictMode>,
)
