import React, { useState } from 'react';

function Quiz() {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [feedback, setFeedback] = useState("");

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user_id: "user123", answers }),
    });
    const data = await res.json();
    setFeedback(data.feedback);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Allyship Quiz</h2>
      {[0,1,2].map(i => (
        <div key={i} className="mb-2">
          <p>Q{i+1}: Choose an inclusive action</p>
          <select className="border p-2 w-full" onChange={(e) => handleChange(i, e.target.value)}>
            <option value="">Select</option>
            <option value="inclusive">Inclusive</option>
            <option value="exclusive">Exclusive</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 w-full mt-2">Submit</button>
      {feedback && <p className="mt-4 font-bold">{feedback}</p>}
    </div>
  );
}

export default Quiz;
