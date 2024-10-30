import React from "react";
import SneakerImg1 from "../../assets/images/SneakerImg1.webp";
import ProductDetailDialog from "./ProductDetailDialog";
import { Heart } from "lucide-react";

const ItemDescription = ({ product }) => {
  return (
    <div className="flex flex-col justify-start  h-full">
      <h1 className="text-[#D33918] mb-4">{product.tags[0]}</h1>
      <h1 className="text-xl  mb-4">{product.name}</h1>
      <h1 className="text-base opacity-[.7] capitalize  mb-4">
        {product.gender} {product.ageGroup} {product.useFor}
      </h1>
      <h1 className="text-base   mb-4">${product.price}</h1>
      {/* Color Images */}
      {/* <div className="flex items-center gap-2 mb-6 w-full flex-wrap">
        <img
          src={SneakerImg1}
          alt="Color 1"
          className="w-16 h-16 object-cover"
        />
        <img
          src={SneakerImg1}
          alt="Color 2"
          className="w-16 h-16 object-cover"
        />
        <img
          src={SneakerImg1}
          alt="Color 3"
          className="w-16 h-16 object-cover"
        />
        <img
          src={SneakerImg1}
          alt="Color 1"
          className="w-16 h-16 object-cover"
        />
        <img
          src={SneakerImg1}
          alt="Color 2"
          className="w-16 h-16 object-cover"
        />
      </div> */}
      <p className="text-gray-600 mb-4 text-justify">{product.description}</p>
      <div className="mb-6  flex flex-row justify-start">
        <span className="ml-1">
          Colour Shown : {product.colors.join(" / ")}
        </span>
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap gap-2 mb-6">
        {product.sizes.map((size) => (
          <button
            key={size}
            className="border border-gray-300 w-16 h-16 text-sm flex items-center justify-center"
          >
            {size}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <button className="bg-black flex flex-row justify-center items-center gap-3 text-white border-2 border-black rounded-full w-full px-4 py-4 hover:opacity-80">
          Add to Favorites <Heart />
        </button>

        <ProductDetailDialog product={product} />
      </div>
    </div>
  );
};

export default ItemDescription;
