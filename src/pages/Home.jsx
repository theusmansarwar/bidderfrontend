import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import AboutAuction from "../components/AboutAuction";
import FeaturedArtists from "../components/FeaturedArtists";
import BiddingChart from "../components/BiddingChart";

const Home = () => {
  const OFFSET = 10;
  const [dataLoaded, setDataLoaded] = useState(false);

  function scrollToHash(hash) {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Scroll after data loads
  useEffect(() => {
    if (dataLoaded && window.location.hash) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        scrollToHash(window.location.hash);
      }, 50);
    }
  }, [dataLoaded]);

  // Listen for hash changes during navigation
  useEffect(() => {
    const onHashChange = () => {
      if (dataLoaded) {
        scrollToHash(window.location.hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [dataLoaded]);

  return (
    <div>
      <Hero />
      <BiddingChart/>
      <AboutAuction />
      <FeaturedArtists onDataLoaded={() => setDataLoaded(true)} />
      <div id="artworks">
        <ProductsSection onDataLoaded={() => setDataLoaded(true)} />
      </div>
    </div>
  );
};

export default Home;