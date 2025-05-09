import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ name: '', isLoggedIn: false });
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            EqualOpp Hub
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-700 font-medium hover:text-teal-600 transition-colors">Dashboard</Link>
          <Link to="/updateGoal" className="text-gray-700 font-medium hover:text-teal-600 transition-colors">Change Goal</Link>

          {/* Logged In State */}
          {user.isLoggedIn ? (
            <>
              <span className="text-sm font-medium text-gray-600">Hi, {user.name || 'User'}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-md hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;