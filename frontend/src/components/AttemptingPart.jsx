import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function AttemptingPart({ question, passValue, index }) {
  const [selectedValue, setSelectedValue] = useState("");

  // Sync selected value with userResponse if already attempted
  useEffect(() => {
    if (question.attempted) {
      setSelectedValue(question.userResponse);
    } else {
      setSelectedValue("");
    }
  }, [question]);

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    passValue(option);
  };

  // Neutral-themed option colors
  const optionColors = [
    "bg-[#E0F0FF]", // Light blue
    "bg-[#DCF2E9]",
    "bg-[#FFF3DC]",
    "bg-[#F5E6FF]",
  ];

  const selectedColors = [
    "bg-[#4A90E2]", // Strong blue
    "bg-[#7ED321]", // Mint green
    "bg-[#FF9500]", // Warm orange
    "bg-[#9B59B6]", // Purple accent
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
        {index + 1}. {question.question}
      </h2>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {question.options.map((option, idx) => {
          let bgColor = option === selectedValue ? selectedColors[idx] : optionColors[idx];
          let textColor = option === selectedValue ? "text-white" : "text-gray-800";
          let border = question.attempted && question.userResponse === option
            ? "border-2 border-blue-700 shadow-lg"
            : "";

          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option)}
              className={`text-center py-6 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${bgColor} ${textColor} ${border}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Hint Card */}
      <div className="mt-6">
        {question.hint && question.hint.trim() !== "" ? (
          <FlipCard
            key={`hint-${index}`}
            text="💡 Need a hint?"
            backText={question.hint}
          />
        ) : null}
      </div>
    </div>
  );
}

// Flip card for hints
function FlipCard({ text, backText }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front of the card */}
        <div
          onClick={handleClick}
          className="py-4 bg-gradient-to-r from-[#4A90E2] to-[#7ED321] text-white text-center rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          {text}
        </div>

        {/* Back of the card */}
        <div
          onClick={handleClick}
          className="py-4 bg-white text-gray-800 text-center rounded-lg shadow-md border border-blue-200 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          {backText}
        </div>
      </ReactCardFlip>
    </div>
  );
}