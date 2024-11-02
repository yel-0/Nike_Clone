import { Send, Heart, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import nikelogo from "../../assets/images/nikelogo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-white   p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-black text-2xl font-bold">
          <Link to="/">
            <img src={nikelogo} alt="" width={70} height={70} />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-black hover:text-gray-700">
            Home
          </Link>
          <Link to="/about" className="text-black hover:text-gray-700">
            About
          </Link>
          <Link to="/products" className="text-black hover:text-gray-700">
            Products
          </Link>
          <Link to="/contact" className="text-black hover:text-gray-700">
            Contact
          </Link>
          <SearchBox />
        </div>

        {/* Favorite Button */}
        <Link to={"/favorite"} className="ml-4">
          <button className="text-black hover:bg-gray-100 rounded-full p-2">
            <Heart size={22} />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
