import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';

// Import your components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import UpdateGoal from './pages/UpdateGoal';
import Scenario from './pages/Scenario';
import Result from './pages/Result';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <QuizProvider>
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
              <Route path="/scenario/:id" element={<Scenario />} />
              <Route path="/result" element={<Result />} />

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
      </QuizProvider>
    </Router>
  );
}

export default App;