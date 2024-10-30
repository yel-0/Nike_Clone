import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Fake data for products
const fakeProducts = [
  { _id: "1", name: "Nike Air Max" },
  { _id: "2", name: "Adidas Ultraboost" },
  { _id: "3", name: "Puma RS-X" },
  { _id: "4", name: "Reebok Classic" },
  { _id: "5", name: "New Balance 574" },
  { _id: "6", name: "Asics Gel-Lyte" },
];

const AssociatedProducts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAddProduct = (product) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productToRemove) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product !== productToRemove)
    );
  };

  const filteredProducts = fakeProducts.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="p-5 shadow-sm bg-white border border-gray-300 rounded-lg">
      {/* Only show the search input if the user has started typing */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Search Products
        </label>
        <Input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Enter product name"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Conditionally render the available products section */}
      {searchInput && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Available Products
          </h3>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-gray-800">{product.name}</span>
                <Button
                  onClick={() => handleAddProduct(product)}
                  className="bg-blue-600 text-white rounded-lg px-3 py-1 hover:bg-blue-700"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditionally render the associated products section */}
      {selectedProducts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Associated Products
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 border border-gray-300 px-4 rounded-lg p-2 shadow-sm flex items-center justify-between"
              >
                <span className="text-gray-800">{product.name}</span>
                <button
                  onClick={() => handleRemoveProduct(product)}
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  &times; {/* Close icon for removing */}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociatedProducts;
