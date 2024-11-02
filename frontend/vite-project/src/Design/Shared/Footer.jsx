import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10  border-t border-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Company Info */}
          <div className="flex-1">
            <h2 className="text-lg">Your Company</h2>
            <p className="mt-4 text-sm">
              Your Company is dedicated to providing high-quality products and
              exceptional customer service. Explore our diverse range of items
              and discover something just for you.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <h2 className="text-lg">Quick Links</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Explore
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Account
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="flex-1">
            <h2 className="text-lg">Customer Support</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex-1">
            <h2 className="text-lg">Contact Us</h2>
            <p className="mt-4 text-sm">Email: support@yourcompany.com</p>
            <p className="mt-1 text-sm">Phone: +1 (555) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              <a href="/" target="_blank" className="hover:underline">
                Facebook
              </a>
              <a href="/" target="_blank" className="hover:underline">
                Twitter
              </a>
              <a href="/" target="_blank" className="hover:underline">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm">
            &copy; 2024 Your Company. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/" target="_blank" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" target="_blank" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
