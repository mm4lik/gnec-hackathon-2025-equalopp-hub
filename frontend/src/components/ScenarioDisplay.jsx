import React from 'react';

function ScenarioDisplay({ scenario, index, showQuizOnly }) {
  if (!scenario) return null;

  const commonClasses = "mt-4 p-5 border border-gray-200 rounded-lg bg-white shadow-sm";

  if (showQuizOnly) {
    return (
      <div className={commonClasses}>
        <h3 className="text-lg font-semibold text-teal-700 mb-3">Quiz</h3>

        <ul className="space-y-3">
          {scenario.quiz.map((q, qIdx) => (
            <li key={qIdx} className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-gray-800">{q.question}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx} className="text-gray-700">{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-sm">
          <strong className="text-gray-600">Open Ended Question:</strong> 
          <p className="text-gray-800 mt-1">{scenario.openEndedQuestion}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={commonClasses}>
      <h3 className="text-xl font-bold text-blue-700 mb-4">Scenario {index + 1}</h3>

      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <p><strong className="text-gray-600">Description:</strong> {scenario.description}</p>
        <p><strong className="text-gray-600">Tags:</strong> {scenario.tags.join(', ')}</p>
        <p><strong className="text-gray-600">Difficulty:</strong> {scenario.difficulty}</p>
        <p><strong className="text-gray-600">Topic:</strong> {scenario.topic}</p>
        <p><strong className="text-gray-600">Expected Skill:</strong> {scenario.expectedSkill}</p>
      </div>

      <div className="mt-5">
        <h4 className="font-semibold text-teal-700 mb-3">Quiz</h4>
        <ul className="space-y-3">
          {scenario.quiz.map((q, qIdx) => (
            <li key={qIdx} className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-gray-800">{q.question}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx} className="text-gray-700">{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <strong className="text-gray-600 block mb-2">Open Ended Question:</strong>
        <p className="text-gray-800">{scenario.openEndedQuestion}</p>
      </div>

      {scenario.links.length > 0 && (
        <div className="mt-5">
          <strong className="text-gray-600 block mb-2">Resources & Links:</strong>
          <ul className="space-y-2">
            {scenario.links.map((link, lIdx) => (
              <li key={lIdx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScenarioDisplay;