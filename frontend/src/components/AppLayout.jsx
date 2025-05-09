import React from 'react';

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div className="flex items-center space-x-3">
            {/* Replace with your actual logo later */}
            <img src="/logo.png" alt="Empowerment Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">EmpowerHer</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pt-16 pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-3">
            <h2 className="text-lg font-semibold text-white">EmpowerHer Initiative</h2>
            <p className="text-sm text-center max-w-md">
              Building equitable futures through education, technology, and empowerment.
              Supporting UN Sustainable Development Goals 5 & 10.
            </p>
            <p className="text-xs mt-2 text-gray-400">
              &copy; {new Date().getFullYear()} EmpowerHer Initiative. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;