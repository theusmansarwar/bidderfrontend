import React from "react";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import AboutAuction from "../components/AboutAuction";
import FeaturedArtists from "../components/FeaturedArtists";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutAuction />
      <FeaturedArtists />
      <ProductsSection />
    </div>
  );
};

export default Home;
