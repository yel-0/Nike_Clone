import React from "react";
import SneakerImg1 from "../../assets/images/SneakerImg1.webp";
import ProductDetailDialog from "./ProductDetailDialog";
import { Heart } from "lucide-react";
import { useAddFavorite } from "@/Hook/Favorite/useAddFavorite";
const ItemDescription = ({ product }) => {
  const { mutate: addFavorite, isLoading, isError } = useAddFavorite();

  const handleAddFavorite = () => {
    addFavorite(product._id);
  };

  return (
    <div className="flex flex-col justify-start h-full">
      <h1 className="text-[#D33918] mb-4">{product.tags[0]}</h1>
      <h1 className="text-xl mb-4">{product.name}</h1>
      <h1 className="text-base opacity-[.7] capitalize mb-4">
        {product.gender} {product.ageGroup} {product.useFor}
      </h1>
      <h1 className="text-base mb-4">${product.price}</h1>

      {/* Description */}
      <p className="text-gray-600 mb-4 text-justify">{product.description}</p>

      {/* Color Shown */}
      <div className="mb-6 flex flex-row justify-start">
        <span className="ml-1">Colour Shown: {product.colors.join(" / ")}</span>
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
        <button
          onClick={handleAddFavorite}
          disabled={isLoading}
          className="bg-black flex flex-row justify-center items-center gap-3 text-white border-2 border-black rounded-full w-full px-4 py-4 hover:opacity-80"
        >
          {isLoading ? "Adding..." : "Add to Favorites"} <Heart />
        </button>
        {/* {isError && <p className="text-red-500">Failed to add to favorites</p>} */}

        <ProductDetailDialog product={product} />
      </div>
    </div>
  );
};

export default ItemDescription;
