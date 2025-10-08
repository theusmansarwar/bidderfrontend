import React, { useEffect } from "react";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import AboutAuction from "../components/AboutAuction";
import FeaturedArtists from "../components/FeaturedArtists";

const Home = () => {
  const OFFSET = 80;

  function scrollToHash(hash) {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  useEffect(() => {
    // initial scroll on page load
    scrollToHash(window.location.hash);

    // listen for future hash changes
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div>
      <Hero />
      <AboutAuction />
      <FeaturedArtists />
      <div id="artworks">
        <ProductsSection />
      </div>
    </div>
  );
};

export default Home;
