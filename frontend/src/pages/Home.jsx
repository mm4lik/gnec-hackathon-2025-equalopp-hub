import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to EqualOpp Hub</h1>
      <p className="mb-4">Empowering allies through interactive learning.</p>
      <Link to="/login" className="text-blue-500 underline">Get Started</Link>
    </div>
  );
}

export default Home;
