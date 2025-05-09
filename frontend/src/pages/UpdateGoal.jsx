import React, { useState } from 'react';

function UpdateGoal() {
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/update-goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ goal }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Goal updated successfully!');
        setError('');
        setGoal('');
      } else {
        setError(data.message || 'Failed to update goal');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Server error — please try again later');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Your Goal</h2>
        <p className="text-gray-600 mb-6">Choose a personal development goal to focus on.</p>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="goal"
            placeholder="E.g., Improve Workplace Equity Awareness"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update Goal
          </button>
        </form>

        {/* Success Message */}
        {message && (
          <p className="mt-4 text-green-600 text-sm">{message}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-600 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

export default UpdateGoal;