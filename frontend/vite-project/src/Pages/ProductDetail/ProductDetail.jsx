import React from "react";
import { useParams } from "react-router-dom";
import ItemDescription from "@/Design/Shared/ItemDescription";
import ItemImageCarousel from "@/Design/Shared/ItemImageCarousel";
import SneakerCarousel from "@/Design/User/ItemCarousel";
import useProductById from "../../Hook/Product/useProductById"; // Adjust path as necessary

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const { data: product, isLoading, error } = useProductById(id); // Fetch product data

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product details.</p>;

  return (
    <div>
      {/* Product Detail Section */}
      <div className="flex h-auto relative flex-row justify-start lg:flex-nowrap flex-wrap  items-start w-full gap-3">
        <div className=" w-full lg:w-[700px]  flex flex-row justify-center items-center p-5">
          <ItemImageCarousel images={product.imageUrl} product={product} />{" "}
        </div>

        {/* Product Description */}
        <div className="w-full lg:w-[450px]  p-5">
          <ItemDescription product={product} />
        </div>
      </div>

      {/* Related Products Carousel */}
      {/* <div>
        <SneakerCarousel title="You Might Also Like" />
      </div> */}
    </div>
  );
};

export default ProductDetail;
