import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-10">
          <a href="/" className="hover:text-gray-700 transition-colors">
            Shop
          </a>
          <a href="/" className="hover:text-gray-700 transition-colors">
            Explore
          </a>
          <a href="/" className="hover:text-gray-700 transition-colors">
            Support
          </a>
          <a href="/" className="hover:text-gray-700 transition-colors">
            Account
          </a>
        </div>

        <div className="mt-5 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm">
            &copy; 2024 Your Company. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="/"
              target="_blank"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              target="_blank"
              className="hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
