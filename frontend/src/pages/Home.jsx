import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-teal-50 to-green-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center transform transition-all hover:shadow-xl duration-300">

        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z"></path>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to EqualOpp Hub
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Empowering allies through interactive learning for Gender Equality and Reduced Inequalities.
        </p>

        {/* CTA Button */}
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;