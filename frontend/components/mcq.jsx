import React, { useState } from "react";

const Mcq = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleOptionChange = (event) => {
    const selectedText = event.target.value;
    setSelectedOption(selectedText);

    const correctOption = options.find((option) => option.isCorrectAnswer);
    setCorrectAnswer(correctOption.text);

    const isCorrect = correctOption.text === selectedText;
    setResult(isCorrect ? "Correct Answer!" : "Wrong Answer.");
  };

  return (
    <div className="py-3">
      <div className="space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-2 rounded-lg ${
              selectedOption === option.text
                ? option.isCorrectAnswer
                  ? "bg-green-100"
                  : "bg-red-100"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="mcq"
              id={`option-${index}`}
              value={option.text}
              onChange={handleOptionChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`option-${index}`}
              className="text-gray-800 cursor-pointer"
            >
              {option.text}
            </label>
          </div>
        ))}
      </div>
      {result && (
        <div className="mt-4">
          <div
            className={`p-3 text-center rounded-lg ${
              result === "Correct Answer!"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {result}
          </div>
          {result === "Wrong Answer." && correctAnswer && (
            <div className="mt-2 p-2 text-center bg-blue-100 text-blue-800 rounded-lg">
              Correct Answer: <strong>{correctAnswer}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mcq;
