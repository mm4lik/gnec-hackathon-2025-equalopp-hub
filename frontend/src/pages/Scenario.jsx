import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ScenarioDisplay from '../components/ScenarioDisplay';

function Scenario() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If scenario data was passed via navigation state, use it
    if (location.state && location.state.scenario) {
      setScenario(location.state.scenario);
      setLoading(false);
    } else {
      // Otherwise, fetch all scenarios and pick one by ID
      fetch('http://localhost:3000/get-scenarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch scenarios');
          return res.json();
        })
        .then((data) => {
          if (data.scenarios && data.scenarios[id]) {
            setScenario(data.scenarios[id]);
          } else {
            setError('Scenario not found.');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch scenario.');
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading scenario...</p>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center mt-12">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error || 'No scenario found.'}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>&larr;</span>
          <span>Back to Dashboard</span>
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Scenario Description</h2>

        {/* Scenario Details */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{scenario.description}</p>
        </div>

        {/* Tags / Topic Pill */}
        <div className="mt-6 flex flex-wrap gap-2">
          {scenario.topic && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
              {scenario.topic}
            </span>
          )}
          {scenario.tags?.length > 0 &&
            scenario.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full border border-teal-200"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/quiz', { state: { scenario } })}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scenario;