import React, { useState, useEffect } from 'react';
import ScenarioCard from '../components/ScenarioCard';
import FeedbackPanel from '../components/FeedbackPanel';

function Quiz() {
  const [scenario, setScenario] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Fetch scenario data from the API
    fetch('/api/scenario')
      .then((response) => response.json())
      .then((data) => setScenario(data))
      .catch((error) => console.error('Error fetching scenario:', error));
  }, []);

  const handleSubmit = (response) => {
    // Submit user response to the API
    fetch('/api/submit-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response }),
    })
      .then((response) => response.json())
      .then((data) => setFeedback(data.feedback))
      .catch((error) => console.error('Error submitting response:', error));
  };

  return (
    <div className="container mx-auto p-4">
      {scenario ? (
        <ScenarioCard
          title={scenario.title}
          context={scenario.context}
          question={scenario.question}
          type={scenario.type}
          options={scenario.options}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>Loading scenario...</p>
      )}

      {feedback && (
        <div className="mt-4">
          <FeedbackPanel feedback={feedback.text} isCorrect={feedback.isCorrect} />
        </div>
      )}
    </div>
  );
}

export default Quiz;
