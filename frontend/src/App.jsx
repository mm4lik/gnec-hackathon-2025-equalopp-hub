import { useState } from 'react';
import reactLogo from './assets/react.svg'; // Import React logo
import viteLogo from '/vite.svg'; // Import Vite logo
import './App.css'; // Import CSS for styling

function App() {
  const [count, setCount] = useState(0); // State hook to track the count

  return (
    <>
      <div>
        {/* Vite Logo with a link to vite.dev */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        {/* React Logo with a link to react.dev */}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Header text */}
      <h1>Vite + React</h1>

      {/* Card container for the count button */}
      <div className="card">
        {/* Button to increment the count */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} {/* Display current count */}
        </button>
        
        {/* Instructions to edit the file and test Hot Module Replacement (HMR) */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Text to encourage users to click the logos for more information */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
