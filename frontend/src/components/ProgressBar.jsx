import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="bg-gradient-to-r from-blue-500 to-teal-500 h-4 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center w-full pointer-events-none">
        <span className="text-xs font-semibold text-white drop-shadow-sm">
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;