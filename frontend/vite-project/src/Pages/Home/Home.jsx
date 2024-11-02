import React from "react";

import HeroSection from "@/Design/User/HeroSection";
import ItemCarousel from "@/Design/User/ItemCarousel";

const Home = () => {
  return (
    <div className="mb-10">
      <HeroSection />
      <ItemCarousel category={"shoes"} title={"Our Latest Products"} />
      <ItemCarousel category={"Hoodies"} title={"Stay Warm, Stay Stylish"} />
      <ItemCarousel
        category={"Tops & T-Shirts"}
        title={"Elevate Your Everyday Look"}
      />

      {/* <SneakerCarousel title={"Fancy is power"} /> */}
    </div>
  );
};

export default Home;
