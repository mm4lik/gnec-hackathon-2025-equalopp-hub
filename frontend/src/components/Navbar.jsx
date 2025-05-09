import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component to handle navigation links
function Navbar() {
  return (
    // Navbar container with background color and padding, using flexbox for layout
    <nav className="bg-gray-100 p-4 flex justify-between">
      {/* Logo on the left side, linked to homepage */}
      <Link to="/" className="font-bold text-lg">
        EqualOpp Hub {/* Brand name with bold font and larger text size */}
      </Link>

      {/* Right-side container for navigation links with spacing between them */}
      <div className="space-x-4">
        {/* Navigation links for different pages of the app */}
        <Link to="/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
          Dashboard {/* Text link to dashboard */}
        </Link>

        <Link to="/quiz" className="text-sm text-gray-700 hover:text-blue-600">
          Quiz {/* Text link to quiz page */}
        </Link>

        <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">
          Login {/* Text link to login page */}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

