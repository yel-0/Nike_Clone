// src/components/SizeColorStockInput.js
import React from "react";
import { Input } from "@/components/ui/input";

const SizeColorStockInput = ({
  sizeInput,
  setSizeInput,
  colorInput,
  setColorInput,
  stockInput,
  setStockInput,
}) => {
  return (
    <div className="flex w-full flex-row justify-center items-center">
      <div className="p-5 shadow-sm w-full bg-white border border-gray-300 rounded-lg">
        {/* Sizes Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sizes
          </label>
          <Input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="Enter sizes (comma separated)"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {sizeInput.trim() && (
            <div className="mt-2 flex flex-wrap gap-2">
              {sizeInput.split(",").map((size, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 px-4 rounded-lg p-2 shadow-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {size.trim()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colors Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Colors
          </label>
          <Input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Enter colors (comma separated)"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {colorInput.trim() && (
            <div className="mt-2 flex flex-wrap gap-2">
              {colorInput.split(",").map((color, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 px-4 rounded-lg p-2 shadow-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {color.trim()}
                  </span>
                </div>
              ))}
            </div>
          )}
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
