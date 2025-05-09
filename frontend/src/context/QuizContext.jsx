import React, { createContext, useState } from "react";

// Create the Quiz Context
export const QuizContext = createContext();

// Create the provider component
export function QuizProvider({ children }) {
  // State for quiz data
  const [quiz, setQuiz] = useState([]);

  // Track current question index
  const [currentStep, setCurrentStep] = useState(0);

  // Store user answers
  const [answers, setAnswers] = useState([]);

  // Track if quiz is completed
  const [isFinished, setIsFinished] = useState(false);

  // Optional: score tracking (if applicable)
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,
        currentStep,
        setCurrentStep,
        answers,
        setAnswers,
        isFinished,
        setIsFinished,
        score,
        setScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}