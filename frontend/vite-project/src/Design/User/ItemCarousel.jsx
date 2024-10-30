import React from "react";
import Item from "@/Design/Shared/Item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useAllProducts from "@/Hook/Product/useAllProducts";
const ItemCarousel = ({ title }) => {
  const { data: products, isLoading, isError } = useAllProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  return (
    <div className="relative px-3 max-w-[1300px] m-auto pt-10">
      <div className="flex flex-row h-[70px] justify-start items-center py-2">
        <div className="text-2xl select-none">{title}</div>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id} className="basis-1/3">
              <Item product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute h-[70px] flex flex-row w-[20px] top-[-70px] right-[50px]">
          <CarouselPrevious className="w-[50px] h-[50px]" />
          <CarouselNext className="w-[50px] h-[50px]" />
        </div>
      </Carousel>
    </div>
  );
};

export default ItemCarousel;
