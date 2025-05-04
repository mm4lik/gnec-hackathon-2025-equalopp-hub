import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [level, setLevel] = useState("Beginner Ally");

  useEffect(() => {
    // Later: fetch user score and set level
    setLevel("Rising Ally 🌟");
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Allyship Dashboard</h2>
      <p>Current Level: <span className="font-bold">{level}</span></p>
      <p className="mt-4">Complete quizzes to earn badges and grow as an ally!</p>
    </div>
  );
}

export default Dashboard;
