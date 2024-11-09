import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative p-4 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto aspect-w-16 aspect-h-9">
        <img
          src="https://res.cloudinary.com/dcgn707fg/image/upload/v1730343200/images/evtvpmjb1kder9hvzsdw.jpg"
          alt="Nike Hero Section"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col mt-6 justify-center items-center gap-2 p-4">
        <div className="text-lg sm:text-xl md:text-2xl font-bold">Tatum</div>
        <div className="font-bold text-4xl sm:text-6xl md:text-7xl text-center">
          ZERO PRESSURE
        </div>
        <div className="w-full sm:w-[80%] text-center text-sm sm:text-base md:text-lg">
          Greatness happens when you’re focused on your flight path. This newest
          colourway ‘Zero Days Off’ speaks to Jayson’s love of the grind and is
          here to help you elevate your game.
        </div>
        <Link to="/discover">
          <Button className="rounded-full mt-4 sm:mt-6 text-sm sm:text-base">
            Shop
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
