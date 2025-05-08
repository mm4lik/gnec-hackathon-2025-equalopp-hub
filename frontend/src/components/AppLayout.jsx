import React from 'react';

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-lg font-bold">App Title</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;