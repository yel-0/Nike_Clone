import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Check } from "lucide-react";

const UpdateKeyFeatureInput = ({ keyFeatures, setKeyFeatures }) => {
  const [featureInput, setFeatureInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setKeyFeatures([...keyFeatures, featureInput]);
      setFeatureInput("");
    } else {
      alert("Please enter a key feature.");
    }
  };

  const handleEditFeature = (index) => {
    setEditingIndex(index);
    setFeatureInput(keyFeatures[index]);
  };

  const handleSaveEdit = () => {
    if (featureInput.trim()) {
      const updatedFeatures = [...keyFeatures];
      updatedFeatures[editingIndex] = featureInput;
      setKeyFeatures(updatedFeatures);
      setEditingIndex(null);
      setFeatureInput("");
    } else {
      alert("Please enter a key feature.");
    }
  };

  const handleRemoveFeature = (index) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-300 shadow-md rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
      {/* Add or Edit Feature Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          placeholder="Enter key feature"
          className="flex-1 border text-sm rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
        />
        {editingIndex !== null ? (
          <Button
            type="button"
            onClick={handleSaveEdit}
            className="bg-blue-600 text-white px-2 py-2 flex items-center gap-1 rounded-lg transition duration-200 hover:bg-blue-500"
            aria-label="Save feature"
          >
            <Check size={16} /> Save
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleAddFeature}
            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 flex items-center gap-1 rounded-lg transition duration-200"
            aria-label="Add feature"
          >
            <Plus size={16} /> Add
          </Button>
        )}
      </div>

      {/* Key Features List */}
      <ul className="space-y-2">
        {keyFeatures.map((feature, index) => (
          <li
            key={index}
            className="flex justify-between text-sm items-center border border-gray-300 bg-white p-2 rounded-lg shadow-sm transition duration-200 hover:shadow-md"
          >
            <span className="text-gray-700">{feature}</span>

            <div className="flex items-center gap-2">
              {editingIndex === index ? (
                <Button
                  type="button"
                  onClick={handleSaveEdit}
                  className="text-blue-500 bg-white hover:bg-gray-100 px-2 py-1 rounded transition duration-200"
                  aria-label="Save edited feature"
                >
                  <Check size={14} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleEditFeature(index)}
                  className="text-blue-500 bg-white hover:bg-gray-100 px-2 py-1 rounded transition duration-200"
                  aria-label="Edit feature"
                >
                  <Edit2 size={14} />
                </Button>
              )}
              <Button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 bg-white hover:bg-gray-100 px-2 py-1 rounded transition duration-200"
                aria-label="Remove feature"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateKeyFeatureInput;
