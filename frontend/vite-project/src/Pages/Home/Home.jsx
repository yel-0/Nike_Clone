import React from "react";

import HeroSection from "@/Design/User/HeroSection";
import SneakerCarousel from "@/Design/User/ItemCarousel";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SneakerCarousel title={"New in this week"} />
      <SneakerCarousel title={"Move like a motion"} />
      <SneakerCarousel title={"Fancy is power"} />
    </div>
  );
};

export default Home;
