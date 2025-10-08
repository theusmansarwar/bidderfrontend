import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  // ✅ Enhanced scroll-to-hash logic
  function ScrollToHashElement() {
    const { hash } = useLocation();

    useEffect(() => {
      if (!hash) return;

      // Run scroll after a short delay to ensure content is rendered
      const scrollToSection = () => {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -10; // adjust if your Navbar height differs
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };

      // Delay ensures section exists in DOM before scrolling
      setTimeout(scrollToSection, 300);
    }, [hash]);

    return null;
  }

  return (
    <div>
      <ScrollToHashElement />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
