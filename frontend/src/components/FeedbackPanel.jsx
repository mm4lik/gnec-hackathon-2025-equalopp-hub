import React from 'react';

function FeedbackPanel({ feedback, isCorrect }) {
  return (
    <div
      className={`border-l-4 p-4 rounded-lg shadow-sm ${
        isCorrect 
          ? 'border-teal-500 bg-teal-50 text-teal-800' 
          : 'border-blue-500 bg-blue-50 text-blue-800'
      }`}
    >
      <p className="text-sm md:text-base">{feedback}</p>
    </div>
  );
}

export default FeedbackPanel;