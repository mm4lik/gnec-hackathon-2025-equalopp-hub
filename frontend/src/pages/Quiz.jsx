import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import Divider from "../components/Divider";
import AttemptingPart from "../components/AttemptingPart";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz, setQuiz } = useContext(QuizContext);
  const [missing, setMissing] = useState(-1);
  const [quizMaterial, setQuizMaterial] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionValue = quizMaterial[currentQuestionIndex];
  console.log(location.state.scenario);

  // Load scenario quiz on mount if passed in route state
  useEffect(() => {
    // Only set quiz context if scenario is present in location.state and quiz is empty
    if (location.state && location.state.scenario && (!quiz || quiz.length === 0)) {
      const scenarioQuiz = location.state.scenario.quiz.map((q) => ({
        ...q,
        userResponse: "",
        attempted: false,
        correctAnswer: q.correctAnswer,
        links: location.state.scenario.links,
        openEndedQuestion: location.state.scenario.openEndedQuestion
      }));
      setQuiz(scenarioQuiz);
    }
    // If no quiz, redirect
    if (!quiz || quiz.length === 0) {
      navigate("/dashboard");
    }
  }, [location.state, setQuiz, quiz, navigate]);

  // Sync local quizMaterial with global QuizContext
  useEffect(() => {
    if (quiz && quiz.length > 0) {
      setQuizMaterial(quiz);
    }
  }, [quiz]);

  function backPage() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  function nextPage() {
    if (currentQuestionIndex < quizMaterial.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  function passValue(value) {
    const updated = [...quizMaterial];
    const question = { ...questionValue, userResponse: value, attempted: true };
    updated[currentQuestionIndex] = question;
    setQuizMaterial(updated);
  }

  function submit() {
    const index = quizMaterial.findIndex(q => !q.attempted);
    if (index === -1) {
      setQuiz(quizMaterial);
      navigate("/result");
    } else {
      setMissing(index);
    }
  }

  function submitAnyways() {
    setQuiz(quizMaterial);
    navigate("/result");
  }

  function goBackToMissing() {
    setMissing(-1);
    setCurrentQuestionIndex(missing);
  }

  if (!quiz || quiz.length === 0 || !questionValue) {
    return (
      <div className="text-center text-red-500 py-8">
        Something went wrong — please try again or return to the dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Question Card */}
      <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-teal-500">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Question {currentQuestionIndex + 1} of {quizMaterial.length}
        </h2>
        <AttemptingPart
          question={questionValue}
          passValue={passValue}
          index={currentQuestionIndex}
        />
      </div>

      <Divider />

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <div className="flex gap-4">
          {currentQuestionIndex > 0 && missing === -1 && (
            <button
              type="button"
              onClick={backPage}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-300"
            >
              Back
            </button>
          )}
          {currentQuestionIndex < quizMaterial.length - 1 && (
            <button
              type="button"
              onClick={nextPage}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none"
            >
              Next
            </button>
          )}
        </div>

        {/* Submit Button */}
        {quizMaterial.length - 1 === currentQuestionIndex && (
          <div className="space-y-4">
            {missing === -1 ? (
              <button
                type="button"
                onClick={submit}
                className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md hover:opacity-90 transition-opacity focus:outline-none"
              >
                Submit Quiz
              </button>
            ) : (
              <>
                <p className="text-sm text-red-600">
                  Looks like you missed some questions!
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={submitAnyways}
                    className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none"
                  >
                    Submit Anyways
                  </button>
                  <button
                    type="button"
                    onClick={goBackToMissing}
                    className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none"
                  >
                    Go Back to Missing
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;