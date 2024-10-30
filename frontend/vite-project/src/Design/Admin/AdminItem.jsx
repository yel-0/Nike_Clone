import React from "react";
import SneakerImg1 from "../../assets/images/SneakerImg1.webp";
import { Button } from "@/components/ui/button";
import DeleteProductConfirmationDialog from "./DeleteProductConfirmationDialog";
import { Link } from "react-router-dom";

const AdminItem = ({ product }) => {
  return (
    <div className="text-center bg-white">
      <img
        src={product.imageUrl[0]} // Or use a fallback image if needed
        alt={product.name}
        className="w-[340px] h-[320px] object-cover rounded-md"
      />

      <div className="flex w-full flex-col py-2 justify-center items-start">
        <div className="text-[#9E3500]">{product.tags[0]}</div>
        <h2 className="text-sm font-medium text-gray-800">{product.name}</h2>
        <p className="text-sm opacity-70">{product.colors.length} Colours</p>
        <p className="text-sm text-gray-600">${product.price}</p>
      </div>

      <div className="flex space-x-2 mt-2">
        {/* Wrap Update button with Link */}
        <Link to={`/admin/product/${product._id}/update`}>
          <Button className="bg-blue-600 text-white hover:bg-blue-500 py-1 px-2 text-sm rounded-md">
            Update
          </Button>
        </Link>

        <DeleteProductConfirmationDialog id={product._id} />
      </div>
    </div>
  );
};

export default AdminItem;
