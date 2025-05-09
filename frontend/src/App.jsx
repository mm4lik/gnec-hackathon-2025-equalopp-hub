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
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/quiz"
                element={<Quiz />}
              />
              <Route
                path="/updateGoal"
                element={<UpdateGoal />}
              />
              <Route
                path="/scenario/:id"
                element={<Scenario />}
              />
              <Route
                path="/result"
                element={<Result />}
              />

              {/* Root Redirect */}
              <Route
                path="/"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Navigate to="/home" />
                  )
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer (optional) */}
          <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
            <p>EqualOpp Hub © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </QuizProvider>
    </Router>
  );
}

// Simple 404 Component
function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-red-600 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-4">The page you’re looking for doesn’t exist.</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}

export default App;