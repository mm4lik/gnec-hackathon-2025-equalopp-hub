import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import UpdateGoal from './pages/UpdateGoal';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/updateGoal" element={<UpdateGoal />} />

            {/* Redirect root to home or login */}
            <Route 
              path="/" 
              element={
                isAuthenticated() ? 
                <Navigate to="/dashboard" /> : 
                <Navigate to="/home" />
              } 
            />

            {/* 404 route */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;