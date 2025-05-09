import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import Divider from "../components/Divider";
import AttemptingPart from "../components/AttemptingPart";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz, setQuiz } = useContext(QuizContext);
  const [missing, setMissing] = useState(-1);
  const [quizMaterial, setQuizMaterial] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionValue = quizMaterial[currentQuestionIndex];

  useEffect(() => {
    // On mount, if scenario is passed, set quiz context only if quiz is empty
    if (location.state && location.state.scenario && (!quiz || quiz.length === 0)) {
      const scenarioQuiz = location.state.scenario.quiz.map((q) => ({
        ...q,
        userResponse: "",
        attempted: false,
      }));
      setQuiz(scenarioQuiz);
    }
    // If no quiz, redirect
    if (!quiz || quiz.length === 0) {
      navigate("/dashboard");
    }
  }, [location.state, setQuiz, navigate]);

  useEffect(() => {
    // Update quiz material from context
    if (quiz && quiz.length > 0) {
      setQuizMaterial(quiz);
    }
  }, [quiz]);

  function backPage() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  }

  function nextPage() {
    if (currentQuestionIndex < quizMaterial.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  }

  function passValue(value) {
    let updatedQuizMaterial = [...quizMaterial];
    let question = { ...questionValue, userResponse: value, attempted: true };
    updatedQuizMaterial[currentQuestionIndex] = question;
    setQuizMaterial(updatedQuizMaterial);
  }

  function submit() {
    const index = quizMaterial.findIndex((e) => e.attempted === false);
    if (index === -1) {
      setQuiz(quizMaterial);
      navigate("/result");
    } else setMissing(index);
  }
  function submitAnyways() {
    setQuiz(quizMaterial);
    navigate("/result");
  }
  function goBack() {
    setMissing(-1);
    setCurrentQuestionIndex(missing);
  }

  if (!quiz || quiz.length === 0 || !questionValue) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="col-span-12">
      <AttemptingPart
        question={questionValue}
        passValue={passValue}
        index={currentQuestionIndex}
      />
      <Divider />
      <div className="flex flex-col">
        <div className="flex gap-4">
          {currentQuestionIndex > 0 && missing === -1 && (
            <button
              type="button"
              className="text-dPurple bg-magnolia inner-border-3 inner-border-amethyst text-center w-150 py-1 text-button rounded-md drop-shadow-lg hover:bg-thistle hover:text-dPurple hover:inner-border-thistle"
              onClick={backPage}
            >
              Back
            </button>
          )}
          {currentQuestionIndex < quizMaterial.length - 1 && (
            <button
              type="button"
              className="text-seasalt bg-amethyst text-center w-150 py-1 text-button rounded-md drop-shadow-lg hover:bg-thistle hover:text-dPurple"
              onClick={nextPage}
            >
              Next
            </button>
          )}
        </div>
        <br />
        {quizMaterial.length - 1 === currentQuestionIndex &&
          (missing === -1 ? (
            <button
              type="button"
              onClick={submit}
              className="text-seasalt bg-iqRed text-center w-150 py-1 text-button rounded-md drop-shadow-lg hover:bg-iqLightRed hover:text-dPurple"
            >
              Submit
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-button text-dPurple">Looks like you missed a few questions!</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={submitAnyways}
                  className="text-seasalt bg-iqRed text-center w-150 py-1 text-button rounded-md drop-shadow-lg hover:bg-iqLightRed hover:text-dPurple"
                >
                  Submit Anyways
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="text-seasalt bg-amethyst text-center w-150 py-1 text-button rounded-md drop-shadow-lg hover:bg-thistle hover:text-dPurple"
                >
                  Back to Quiz
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Quiz;
