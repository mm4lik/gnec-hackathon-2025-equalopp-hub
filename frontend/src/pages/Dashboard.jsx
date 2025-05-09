import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [goal, setGoal] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's goal
    fetch('http://localhost:3000/get-goal', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGoal(data.goal);
        console.log('User goal:', data.goal);
        if (data.goal !== 'set a goal') {
          // Fetch scenarios for the user's goal
          fetch('http://localhost:3000/get-scenarios', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
            .then((response) => response.json())
            .then((data) => setScenarios(data.scenarios))
            .catch((error) => console.error('Error fetching scenarios:', error));
        }
      })
      .catch((error) => console.error('Error fetching goal:', error));
  }, []);

  if (goal === 'set a goal') {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="mb-4">It looks like you haven't set a goal yet.</p>
        <button
          onClick={() => navigate('/updateGoal')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Your Goal
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      <p className="mb-4">Your current goal: <span className="font-bold">{goal}</span></p>
      <h2 className="text-xl font-bold mb-4">Scenarios for Your Goal</h2>

      {scenarios.length > 0 ? (
        <ul>
          {scenarios.map((scenario, idx) => (
            <li key={idx} className="mb-2">
              <button
                className="text-blue-600 underline cursor-pointer"
                onClick={() => navigate(`/scenario/${idx}`, { state: { scenario } })}
              >
                Scenario {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading scenarios...</p>
      )}
    </div>
  );
}

export default Dashboard;
