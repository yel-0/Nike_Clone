import React from "react";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="text-center">
      <Link to={`/product/detail/${product._id}`}>
        <img
          src={product.imageUrl[0]}
          alt={product.name}
          className="w-[420px] h-[420px] object-cover"
        />
      </Link>
      <div className="flex w-full flex-col py-3 justify-center items-start">
        <div className="text-[#9E3500]">{product.tags[0]}</div>
        <h2 className="text-sm font-medium text-gray-800">{product.name}</h2>
        <p className="text-sm opacity-70">{product.colors.length} Colours</p>
        <p className="text-sm text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default Item;
