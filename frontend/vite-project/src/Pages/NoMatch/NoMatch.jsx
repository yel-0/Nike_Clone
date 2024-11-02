import React from "react";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        {/* Error Icon */}
        <div className="text-yellow-500 text-6xl mb-4">
          <i className="fas fa-exclamation-triangle"></i>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium mb-2">404 - Page Not Found</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Button */}
        <button
          onClick={goHome}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NoMatch;
