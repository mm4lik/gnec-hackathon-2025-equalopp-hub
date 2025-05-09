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
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No quiz results to show.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Count correct answers
  const correctCount = quiz.filter(
    (q) =>
      q.userResponse &&
      q.correctAnswer &&
      q.userResponse.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
  ).length;

  // Get open-ended question from scenario if available
  const openEnded = location.state && location.state.scenario && location.state.scenario.openEndedQuestion;

  const passed = correctCount >= Math.ceil(quiz.length / 2); // At least half correct to pass

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h1>
        <p className="text-gray-600 mb-6">Let’s see how you did!</p>

        {/* Score Summary */}
        <div className={`p-6 rounded-lg border ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} mb-6`}>
          <p className="text-2xl font-semibold mb-2">
            You got <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {correctCount} out of {quiz.length}
            </span> correct!
          </p>
          {passed ? (
            <p className="text-green-700 font-medium">Congratulations! You passed the quiz 🎉</p>
          ) : (
            <p className="text-red-700 font-medium">You can do better — try again!</p>
          )}
        </div>

        {/* Open-Ended Question Section */}
        {openEnded && !feedback && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Open-Ended Response</h2>
            <p className="italic text-gray-600 mb-4">{openEnded}</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={5}
              placeholder="Type your answer here..."
              value={openEndedAnswer}
              onChange={(e) => setOpenEndedAnswer(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        )}

        {/* Feedback Display */}
        {feedback && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Coach Feedback</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-left whitespace-pre-wrap">
              {feedback}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mt-4 text-sm">{error}</p>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}