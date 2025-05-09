import React from 'react';

function ScenarioDisplay({ scenario, index, showQuizOnly }) {
  if (!scenario) return null;

  if (showQuizOnly) {
    return (
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h3 className="font-bold mb-2">Quiz</h3>
        <ul>
          {scenario.quiz.map((q, qIdx) => (
            <li key={qIdx} className="mb-1">
              <div>{q.question}</div>
              <ul>
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <strong>Open Ended Question:</strong> {scenario.openEndedQuestion}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="font-bold mb-2">Scenario {index + 1}</h3>
      <p><strong>Description:</strong> {scenario.description}</p>
      <p><strong>Tags:</strong> {scenario.tags.join(', ')}</p>
      <p><strong>Difficulty:</strong> {scenario.difficulty}</p>
      <p><strong>Topic:</strong> {scenario.topic}</p>
      <p><strong>Expected Skill:</strong> {scenario.expectedSkill}</p>

      <div className="mt-2">
        <strong>Quiz:</strong>
        <ul>
          {scenario.quiz.map((q, qIdx) => (
            <li key={qIdx} className="mb-1">
              <div>{q.question}</div>
              <ul>
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <strong>Open Ended Question:</strong> {scenario.openEndedQuestion}
      </div>

      <div className="mt-2">
        <strong>Links:</strong>
        <ul>
          {scenario.links.map((link, lIdx) => (
            <li key={lIdx}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ScenarioDisplay;
