import React, { useState } from 'react';

function UpdateGoal() {
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');

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
        setMessage('Goal updated successfully!');
        setGoal('');
      } else {
        setMessage(data.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Set Your Goal</h2>
      <form onSubmit={handleUpdate} className="space-y-2">
        <input
          type="text"
          name="goal"
          placeholder="Enter your goal"
          className="border p-2 w-full"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Update Goal
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}

export default UpdateGoal;
