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
      // Otherwise, fetch all scenarios and pick the one by id
      fetch('http://localhost:3000/get-scenarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.scenarios && data.scenarios[id]) {
            setScenario(data.scenarios[id]);
          } else {
            setError('Scenario not found.');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch scenario.');
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (loading) return <div>Loading scenario...</div>;
  if (error) return <div>{error}</div>;
  if (!scenario) return <div>No scenario found.</div>;

  return (
    <div className="p-4">
      <button className="mb-4 text-blue-600 underline" onClick={() => navigate(-1)}>
        &larr; Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold mb-4">Scenario Description</h2>
      <p className="mb-6">{scenario.description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate('/quiz', { state: { scenario } })}
      >
        Take Quiz
      </button>
    </div>
  );
}

export default Scenario;
