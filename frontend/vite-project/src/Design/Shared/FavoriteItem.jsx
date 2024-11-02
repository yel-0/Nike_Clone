import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const FavoriteItem = ({ product, onRemoveFavorite }) => {
  return (
    <div className="text-center select-none p-3 rounded-md ">
      <div className="relative overflow-hidden group">
        <Link to={`/product/detail/${product._id}`}>
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="w-[420px] h-[420px] object-cover rounded-md"
          />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents link navigation when clicking the button
            onRemoveFavorite(product._id);
          }}
          className="absolute  bottom-[-40px] right-4 bg-red-500 p-2 text-white rounded-full flex items-center justify-center gap-2 transition-all duration-300 group-hover:bottom-4"
        >
          <Heart />
        </button>
      </div>
      <div className="flex w-full flex-col py-3 justify-center items-start">
        <div className="text-[#9E3500]">{product.tags[0]}</div>
        <h2 className="text-sm font-medium text-gray-800">{product.name}</h2>
        <p className="text-sm opacity-70">{product.colors.length} Colours</p>
        <p className="text-sm text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default FavoriteItem;
