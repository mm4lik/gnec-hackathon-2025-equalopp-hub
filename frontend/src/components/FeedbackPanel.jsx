import React from 'react';

function FeedbackPanel({ feedback, isCorrect }) {
  return (
    <div
      className={`border-l-4 p-4 rounded shadow-md ${
        isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
      }`}
    >
      <p className="text-gray-800">{feedback}</p>
    </div>
  );
}

export default FeedbackPanel;