import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryGrid from "../components/CategoryGrid";
import PromoBanner from "../components/PromoBanner";
import FeaturedProducts from "../components/FeaturedProduct";

const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <CategoryGrid />
      <PromoBanner />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
