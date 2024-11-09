import React from "react";
import Item from "@/Design/Shared/Item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useLatestProductsByCategoryName from "@/Hook/Product/useLatestProductsByCategoryName";

const ItemCarousel = ({ title, category }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useLatestProductsByCategoryName(category);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  return (
    <div className="relative px-3 max-w-[1300px] m-auto pt-10">
      <div className="flex flex-row h-[70px] justify-start items-center p-2">
        <div className="md:text-2xl text-lg select-none">{title}</div>
      </div>
      <Carousel className="w-full" loop>
        <CarouselContent className="ml-0">
          {products?.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 p-2"
            >
              <Item product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute h-[70px] flex flex-row w-[20px] top-[-70px]  right-[55px]">
          <CarouselPrevious className="lg:w-[50px] lg:h-[50px] w-7 h-7 ml-10 lg:m-0" />
          <CarouselNext className="lg:w-[50px] lg:h-[50px] w-7 h-7 " />
        </div>
      </Carousel>
    </div>
  );
};

export default ItemCarousel;
