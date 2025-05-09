import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setUser({ name: '',isLoggedIn: false }); // Reset user context
    alert('Logged out!');
    navigate('/login'); // Redirect to login page
  };
console.log(user);
  return (
    <nav className="bg-gray-100 p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">EqualOpp Hub</Link>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/updateGoal">Change Goal</Link>
        {user.isLoggedIn ? (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}


export default Navbar;