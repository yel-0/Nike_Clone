import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ItemImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    api.scrollTo(index);
  };

  return (
    <div className="flex sticky top-0">
      <div className="flex flex-col space-y-2 mr-4">
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

      <div className="relative w-[520px] ">
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
    </div>
  );
};

export default ItemImageCarousel;
