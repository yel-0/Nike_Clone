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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative p-4 w-full overflow-hidden">
      {/* <Carousel
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
      </Carousel> */}

      <div className="max-w-7xl mx-auto aspect-w-16 aspect-h-9">
        <img
          src="https://res.cloudinary.com/dcgn707fg/image/upload/v1730343200/images/evtvpmjb1kder9hvzsdw.jpg"
          alt="Nike Hero Section"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col mt-6 justify-center items-center gap-2 p-4">
        <div className="text-xl font-bold">Tatum</div>{" "}
        <div className="font-bold text-7xl">ZERO PREASURE</div>
        <div className="w-[80%] text-center">
          Greatness happens when you’re focused on your flight path. This newest
          colourway ‘Zero Days Off’ speaks to Jayson’s love of the grind and is
          here to help you elevate your game.
        </div>
        <Link to="/discover">
          <Button className="rounded-full">Shop</Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
