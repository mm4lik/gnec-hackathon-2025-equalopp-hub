import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

export default function AttemptingPart({ question, passValue, index }) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (question.attempted === true) setSelectedValue(question.userResponse);
    else setSelectedValue("");
  }, [question]);

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    passValue(option);
  };

  const colors = [
    "bg-iqLightGreen",
    "bg-iqLightRed",
    "bg-iqLightYellow",
    "bg-iqLightBlue",
  ];
  const selectedColors = [
    "bg-iqGreen",
    "bg-iqRed",
    "bg-iqYellow",
    "bg-iqBlue",
  ];

  return (
    <div className="w-full">
      <h1 className="text-header text-dPurple mb-3">
        {index + 1}. {question.question}
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        {question.options.map((option, idx) => {
          // Determine color: attempted and selected, or just selected, or default
          let colorClass = colors[idx];
          if (option === selectedValue) {
            colorClass = selectedColors[idx];
          }
          if (question.attempted && question.userResponse === option) {
            colorClass = `${selectedColors[idx]} border-2 border-dPurple`;
          }
          return (
            <div
              key={idx}
              className={`text-center text-button py-10 w-full justify-start cursor-pointer rounded-lg drop-shadow-lg ${colorClass}`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          );
        })}
      </div>

      <div className="mb-10">
        {question.hint && question.hint.trim() !== "" ? (
          <FlipCard
            key={`hint-${index}`}
            text="Click here for a hint!"
            backText={question.hint}
          />
        ) : null}
      </div>
    </div>
  );
}

function FlipCard({ text, backText }) {
  const [isFlipped, setIsFlipped] = useState(false);
  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className="mt-10">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          onClick={handleClick}
          className="py-10 bg-thistle w-full text-center text-button rounded-lg cursor-pointer"
        >
          {text}
        </div>

        <div
          onClick={handleClick}
          className="py-10 bg-magnolia inner-border-3 inner-border-amethyst text-center w-full text-button font-garamond rounded-lg cursor-pointer"
        >
          {backText}
        </div>
      </ReactCardFlip>
    </div>
  );
}
