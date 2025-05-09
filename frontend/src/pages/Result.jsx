import { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Result() {
  const { quiz } = useContext(QuizContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!quiz || quiz.length === 0) {
    return <div>No quiz results to show.</div>;
  }
console.log(quiz);
  // Count correct answers by matching userResponse to correctAnswer for each question
  const correctCount = quiz.filter(
    (q, idx) => q.userResponse && q.correctAnswer && q.userResponse.trim() === q.correctAnswer.trim()
  ).length;

  // Try to get openEndedQuestion from the quiz context if not present in location.state
  let openEnded = location.state && location.state.scenario && location.state.scenario.openEndedQuestion;
  if (!openEnded && quiz && quiz.length > 0) {
    // Try to find it from the scenario object in quiz context (if present)
    if (quiz[0].openEndedQuestion) {
      openEnded = quiz[0].openEndedQuestion;
    }
  }
console.log(openEnded);
  const passed = correctCount >= 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
        
      const res = await fetch("http://localhost:3000/api/submit-open-ended", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswer: openEndedAnswer }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.feedback);
      } else {
        setError(data.message || "Failed to get feedback");
      }
    } catch (err) {
      setError("Failed to get feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      <p className="text-xl mb-4">
        You got <span className="font-bold text-green-600">{correctCount}</span> out of {quiz.length} correct!
      </p>
      {passed ? (
        <div className="mb-6">
          <p className="text-lg font-semibold text-green-700 mb-2">Congratulations! You passed the quiz.</p>
          {openEnded && !feedback && (
            <form onSubmit={handleSubmit} className="mt-4">
              <p className="font-bold mb-2">Open-Ended Question:</p>
              <p className="italic mb-2">{openEnded}</p>
              <textarea
                className="w-full mt-2 p-2 border rounded"
                rows={4}
                placeholder="Type your answer here..."
                value={openEndedAnswer}
                onChange={e => setOpenEndedAnswer(e.target.value)}
                required
              />
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </form>
          )}
          {feedback && (
            <div className="mt-6">
              <p className="font-bold mb-2">AI Coach Feedback:</p>
              <div className="bg-gray-100 p-4 rounded border mb-4 text-left">{feedback}</div>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          )}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold text-red-600 mb-6">You did not pass. Try again!</p>
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </>
      )}
    </div>
  );
}
