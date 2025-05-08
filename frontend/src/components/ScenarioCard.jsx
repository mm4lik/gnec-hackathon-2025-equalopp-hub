import React, { useState } from 'react';

function ScenarioCard({ title, context, question, type, options, onSubmit }) {
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(response);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{context}</p>
      <div className="mb-4">
        <p className="font-medium mb-2">{question}</p>
        {type === 'open-ended' ? (
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        ) : (
          <div>
            {options.map((option, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="response"
                  value={option}
                  onChange={(e) => setResponse(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Response
      </button>
    </div>
  );
}

export default ScenarioCard;