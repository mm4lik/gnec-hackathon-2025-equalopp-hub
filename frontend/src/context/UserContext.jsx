import React, { createContext, useState, useEffect } from 'react';

// Create the User Context
export const UserContext = createContext();

// Create the User Provider Component
export const UserProvider = ({ children }) => {
  // State for user data
  const [user, setUser] = useState({
    name: '',
    email: '',
    isLoggedIn: false,
    loading: true,
  });

  // Fetch user data using stored token
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3000/get-name', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Authentication failed');
          return res.json();
        })
        .then((data) => {
          setUser({
            name: data.name || 'User',
            email: data.email || '',
            isLoggedIn: true,
            loading: false,
          });
        })
        .catch((err) => {
          console.error('Token validation error:', err.message);
          localStorage.removeItem('token');
          setUser({
            name: '',
            email: '',
            isLoggedIn: false,
            loading: false,
          });
        });
    } else {
      setUser((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user.loading && children}
    </UserContext.Provider>
  );
};