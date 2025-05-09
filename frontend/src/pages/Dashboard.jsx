import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [goal, setGoal] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Define a list of beautiful gradient backgrounds
  const gradientThemes = [
    "bg-gradient-to-r from-blue-50 via-teal-50 to-blue-50",
    "bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50",
    "bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50",
    "bg-gradient-to-r from-pink-50 via-rose-50 to-red-50",
    "bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50",
    "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50",
    "bg-gradient-to-r from-green-50 via-lime-50 to-emerald-50",
    "bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50",
  ];

  useEffect(() => {
    fetch('http://localhost:3000/get-goal', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch goal');
        return response.json();
      })
      .then((data) => {
        setGoal(data.goal);
        if (data.goal !== 'set a goal') {
          fetch('http://localhost:3000/get-scenarios', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to fetch scenarios');
              return res.json();
            })
            .then((scenarioData) => {
              setScenarios(scenarioData.scenarios);
            })
            .catch((error) => {
              console.error('Error fetching scenarios:', error);
              setScenarios([]);
            });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching goal:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (goal === 'set a goal') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-teal-50 to-blue-50 rounded-xl shadow-lg text-center animate-fade-in transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-700 mb-6">It looks like you haven't set a goal yet.</p>
        <button
          onClick={() => navigate('/updateGoal')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Set Your Goal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Your current goal: <span className="font-semibold text-teal-700">{goal}</span>
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Scenarios for Your Goal</h2>

        {scenarios.length > 0 ? (
          <ul className="space-y-4">
            {scenarios.map((scenario, idx) => {
              // Pick a unique gradient per scenario
              const cardBg = gradientThemes[idx % gradientThemes.length];

              return (
                <li key={idx}>
                  <button
                    onClick={() =>
                      navigate(`/scenario/${idx}`, { state: { scenario } })
                    }
                    className={`w-full text-left px-5 py-4 border-l-4 border-teal-500 rounded-md transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-200 ${cardBg}`}
                  >
                    <div className="mb-1">
                      <span className="font-medium">Scenario {idx + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                      {scenario.description}
                    </p>
                    {/* Themed Tag */}
                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <span className="bg-white bg-opacity-70 text-teal-700 font-medium px-2 py-1 rounded border border-teal-200">
                        {scenario.topic || 'Equality Focus'}
                      </span>
                      <span className="bg-white bg-opacity-70 text-blue-700 font-medium px-2 py-1 rounded border border-blue-200">
                        {scenario.tags?.[0] || 'Empowerment'}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No scenarios available at the moment.</p>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        <p>EqualOpp Hub © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Dashboard;