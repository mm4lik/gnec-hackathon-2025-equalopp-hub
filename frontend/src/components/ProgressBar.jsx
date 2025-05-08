import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 relative">
      <div
        className="bg-blue-500 h-6 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
        {progress}%
      </span>
    </div>
  );
}

export default ProgressBar;