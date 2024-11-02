import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const SizeColorStockInput = ({
  sizeInput,
  setSizeInput,
  colorInput,
  setColorInput,
  stockInput,
  setStockInput,
}) => {
  // Temporary states for individual size and color inputs
  const [tempSize, setTempSize] = useState("");
  const [tempColor, setTempColor] = useState("");

  const handleAddSize = () => {
    if (tempSize.trim()) {
      setSizeInput((prev) => [...prev, tempSize.trim()]);
      setTempSize(""); // Clear input
    }
  };

  const handleAddColor = () => {
    if (tempColor.trim()) {
      setColorInput((prev) => [...prev, tempColor.trim()]);
      setTempColor(""); // Clear input
    }
  };

  const handleRemoveSize = (index) => {
    setSizeInput((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveColor = (index) => {
    setColorInput((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full flex-row justify-center items-center">
      <div className="p-5 shadow-sm w-full bg-white border border-gray-300 rounded-lg">
        {/* Sizes Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sizes
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={tempSize}
              onChange={(e) => setTempSize(e.target.value)}
              placeholder="Enter a size"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="button"
              onClick={handleAddSize}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizeInput.map((size, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 px-4 rounded-lg p-2 shadow-sm flex items-center gap-2"
              >
                <span className="text-gray-800 font-medium">{size}</span>
                <button
                  onClick={() => handleRemoveSize(index)}
                  className="text-red-500 font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Colors Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Colors
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              placeholder="Enter a color"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="button"
              onClick={handleAddColor}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {colorInput.map((color, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 px-4 rounded-lg p-2 shadow-sm flex items-center gap-2"
              >
                <span className="text-gray-800 font-medium">{color}</span>
                <button
                  onClick={() => handleRemoveColor(index)}
                  className="text-red-500 font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Stock
          </label>
          <Input
            type="number"
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            placeholder="Enter stock quantity"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default SizeColorStockInput;
