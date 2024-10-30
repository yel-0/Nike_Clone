import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import hero1 from "../../assets/images/hero1.jpg";
import hero2 from "../../assets/images/hero2.jpg";
import Hero from "../../assets/images/Hero.jpg";

const HeroSection = () => {
  const heroImages = [
    {
      id: 1,
      src: Hero,
      alt: "Hero Image 1",
      description: "Discover the latest in sneaker fashion.",
    },
    {
      id: 2,
      src: hero2,
      alt: "Hero Image 2",
      description: "Step up your game with our exclusive styles.",
    },
    {
      id: 3,
      src: hero1,
      alt: "Hero Image 3",
      description: "Find your perfect pair today.",
    },
  ];

  return (
    <div className="relative p-4 w-full h-screen overflow-hidden">
      <Carousel
        className="h-[550px]"
        opts={{
          loop: true,
        }}
        // plugins={[
        //   Autoplay({
        //     delay: 2000,
        //   }),
        // ]}
      >
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image.id} className="h-full relative">
              <div className="relative h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[550px] object-cover object-center"
                />
                <div className="absolute bottom-[50px] left-4 text-white bg-opacity-60 p-4 rounded z-20">
                  <h1 className="text-3xl   uppercase ">{image.description}</h1>
                  <button className="mt-2 px-4 py-2 bg-white shadow-sm text-black text-base  rounded-full">
                    Shop Now
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30" />
      </Carousel>
    </div>
  );
};

export default HeroSection;
