import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', isLoggedIn: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/get-name', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Invalid token');
          }
        })
        .then((data) => {
          setUser({ name: data.name, isLoggedIn: true });
        })
        .catch((err) => {
          console.error('Error validating token:', err);
          localStorage.removeItem('token'); // Remove invalid token
          setUser({ name: '', isLoggedIn: false });
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};