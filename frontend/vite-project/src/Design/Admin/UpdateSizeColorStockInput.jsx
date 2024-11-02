import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const UpdateSizeColorStockInput = ({
  sizeInput,
  setSizeInput,
  colorInput,
  setColorInput,
  stockInput,
  setStockInput,
  initialSizes = [],
  initialColors = [],
  initialStock = 0,
}) => {
  const [sizeInputValue, setSizeInputValue] = useState("");
  const [colorInputValue, setColorInputValue] = useState("");

  // Set initial values once when component mounts
  useEffect(() => {
    if (initialSizes.length) setSizeInput(initialSizes);
    if (initialColors.length) setColorInput(initialColors);
    if (initialStock) setStockInput(initialStock);
  }, [initialSizes, initialColors, initialStock]);

  // Handler to add a new size to the array
  const handleAddSize = (size) => {
    if (size && !sizeInput.includes(size)) {
      setSizeInput([...sizeInput, size]);
      setSizeInputValue(""); // Clear input after adding
    }
  };

  // Handler to remove a size from the array
  const handleRemoveSize = (index) => {
    const newSizes = sizeInput.filter((_, i) => i !== index);
    setSizeInput(newSizes);
  };

  // Handler to add a new color to the array
  const handleAddColor = (color) => {
    if (color && !colorInput.includes(color)) {
      setColorInput([...colorInput, color]);
      setColorInputValue(""); // Clear input after adding
    }
  };

  // Handler to remove a color from the array
  const handleRemoveColor = (index) => {
    const newColors = colorInput.filter((_, i) => i !== index);
    setColorInput(newColors);
  };

  // Prevent default on Enter key press for buttons
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex w-full flex-row justify-center items-center">
      <div className="p-5 shadow-sm w-full bg-white border border-gray-300 rounded-lg">
        {/* Sizes Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sizes
          </label>
          <div className="flex flex-row items-center gap-2">
            <Input
              type="text"
              placeholder="Add size"
              value={sizeInputValue}
              onChange={(e) => setSizeInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleAddSize(sizeInputValue.trim())}
              onKeyDown={handleKeyDown}
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizeInput.map((size, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 px-4 rounded-lg p-2 shadow-sm flex items-center gap-2"
              >
                <span className="text-gray-800 font-medium">{size}</span>
                <button
                  type="button"
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
          <div className="flex flex-row items-center gap-2">
            <Input
              type="text"
              placeholder="Add color"
              value={colorInputValue}
              onChange={(e) => setColorInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 flex-grow"
            />
            <button
              type="button"
              onClick={() => handleAddColor(colorInputValue.trim())}
              onKeyDown={handleKeyDown}
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Add
            </button>
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
            value={stockInput || ""}
            onChange={(e) => setStockInput(Number(e.target.value))}
            placeholder="Enter stock quantity"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSizeColorStockInput;
