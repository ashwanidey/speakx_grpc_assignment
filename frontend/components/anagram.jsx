import { useState } from "react";

function Anagram({ blocks,solution }) {
  const [selectedText, setSelectedText] = useState([]);
  const [usedBlocks, setUsedBlocks] = useState(new Set());
  const [result, setResult] = useState("");

  const formatString = () => {
    if (!Array.isArray(solution)) {
      console.error("`solution` is not an array.");
      return "";
    }
  
    const formatted = solution.join("").replace(/\s+/g, ""); 
    return formatted;
  };
 

  const handleToggleSelectText = (blockText, index) => {
    if (usedBlocks.has(index)) {
      setSelectedText((prev) => prev.filter((_, i) => i !== [...usedBlocks].indexOf(index)));
      setUsedBlocks((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(index);
        return updatedSet;
      });
    } else {

      setSelectedText((prev) => [...prev, blockText]);
      setUsedBlocks((prev) => new Set([...prev, index]));
    }
  };

  const checkAnagram = () => {
    const formatString = (str) =>
      str.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");

    const finalString = selectedText.join("").replace(/\s+/g, "");
    
    const format = solution.replace(/\s+/g, "");
    console.log("Formatted string:", format);
  

    setResult(
      finalString
        ? `${finalString === format ? "Correct!" : "Incorrect!"}`
        : "Please select blocks to form a string."
    );
  };

  return (
    <div className="py-3  ">
      
      <div className="space-y-4 mb-6">
        {blocks.map((block, index) => (
          <div
            key={index}
            onClick={() => handleToggleSelectText(block.text, index)}
            className={`p-4 shadow-md rounded-lg cursor-pointer border border-gray-200 ${
              usedBlocks.has(index)
                ? "bg-blue-800 text-white"
                : "hover:bg-blue-50"
            }`}
          >
            {block.text}
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Selected String:</h2>
        <p className="text-gray-700">
          {selectedText.length > 0 ? selectedText.join(" ") : "No text selected yet."}
        </p>
      </div>
      <button
        onClick={()=>checkAnagram(solution)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Show String
      </button>
      {result && (
        <p className="mt-4 text-center text-lg font-semibold text-green-600">
          {result}
        </p>
      )}
    </div>
  );
}

export default Anagram;
