import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ItemImageCarousel = ({ images, product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    api.scrollTo(index);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse sticky top-0">
      <div className="lg:hidden flex">
        <ScrollArea className="">
          <div className="flex flex-row justify-start items-start lg:flex-col mt-3 lg:mt-0 space-y-0 lg:space-y-2 mr-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`h-16 w-16 object-cover cursor-pointer ${
                  activeIndex === index
                    ? "border-2 border-blue-500"
                    : "border border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="hidden lg:flex   flex-row justify-start items-start lg:flex-col mt-3 lg:mt-0 space-y-0 lg:space-y-2 mr-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`h-16 w-16 object-cover cursor-pointer ${
              activeIndex === index
                ? "border-2 border-blue-500"
                : "border border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      <div className="relative w-full lg:w-[520px] lg:h-[645px] ">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center items-center"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-12 bottom-10 flex">
            <CarouselPrevious className="bg-white rounded-full" />
            <CarouselNext className="bg-white rounded-full mr-3" />
          </div>
        </Carousel>
      </div>
      <div className="lg:hidden flex flex-col">
        <h1 className="text-[#D33918] mb-2">{product.tags[0]}</h1>
        <h1 className="text-xl mb-2">{product.name}</h1>
        <h1 className="text-base opacity-[.7] capitalize mb-2">
          {product.gender} {product.ageGroup} {product.useFor}
        </h1>
        <h1 className="text-base mb-2">${product.price}</h1>
      </div>
    </div>
  );
};

export default ItemImageCarousel;
