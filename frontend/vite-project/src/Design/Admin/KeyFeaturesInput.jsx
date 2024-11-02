import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react"; // Using icons for a modern look

const KeyFeaturesInput = ({ keyFeatures, setKeyFeatures }) => {
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim()) {
      setKeyFeatures([...keyFeatures, featureInput]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#fff] border border-gray-300 shadow-sm rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          placeholder="Enter key feature"
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:border-blue-500"
        />
        <Button
          type="button" // Prevents form submission
          onClick={addFeature}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 flex items-center gap-1 rounded-lg"
        >
          <Plus size={16} />
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {keyFeatures.map((feature, index) => (
          <li
            key={index}
            className="flex justify-between items-center border border-gray-300 bg-white p-2 rounded-lg shadow-sm"
          >
            <span className="text-gray-700">{feature}</span>
            <button
              onClick={() => removeFeature(index)}
              className="text-red-500 bg-white hover:bg-white p-1"
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyFeaturesInput;
