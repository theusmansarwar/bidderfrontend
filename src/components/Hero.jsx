import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const heroData = [
  {
    id: 1,
    image: "/sadquain.jpeg",
    artist: "SADEQUAIN (1930–1987)",
    title: "Untitled (Surah Al-An'am and Surah Anbiya)",
    details: [
      "Price Realised: USD 75,000",
      "Estimate: USD 60,000 – 80,000",
      "Closed: 22 Sep 2021",
    ],
  },
  {
    id: 2,
    image: "jamil-naqsh.webp",
    artist: "Jamil Naqsh (1939–2019)",
    title: "Woman with Pigeon",
    details: [
      "Auction: Modern & Contemporary Arab, Iranian, Indian & Pakistani Art",
      "Venue: Dubai, Royal Mirage Hotel",
      "Date: 3 March 2008, 19:30 +04",
      "Sold For: USD 156,000 (inc. premium)",
    ],
  },
  {
    id: 3,
    image: "gulgee-polo.webp",
    artist: "Gulgee (1926–2007)",
    title: "Polo Player",
    details: [
      "Auction: Modern & Contemporary Arab, Iranian, Indian & Pakistani Art",
      "Venue: Dubai, Royal Mirage Hotel",
      "Date: 3 March 2008, 19:30 +04",
      "Sold For: USD 336,000 (inc. premium)",
    ],
  },
  {
    id: 4,
    image: "/ahmed-khan.webp",
    artist: "Ahmed Khan (1939–2017)",
    title: "Calligraphic Composition",
    details: [
      "Auction: Modern & Contemporary Arab, Iranian, Indian & Pakistani Art",
      "Venue: Dubai, Royal Mirage Hotel",
      "Date: 3 March 2008, 19:30 +04",
      "Sold For: USD 36,000 (inc. premium)",
    ],
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef();

  // Duplicate slides for seamless effect
  const slides = [...heroData, ...heroData];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(heroData.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrent(heroData.length - 1);
      }, 50);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  // Reset when reaching duplicate end
  useEffect(() => {
    if (current === slides.length - heroData.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 700); // match transition duration
      setTimeout(() => setIsTransitioning(true), 750);
    }
  }, [current, slides.length]);

  return (
    <div className="bg-transparent relative w-[94%] sm:w-[90%] m-auto h-[400px] sm:h-[420px] md:h-[520px] lg:mt-6 mt-2 md:mt-8 overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div
        ref={slideRef}
        className={`flex h-full transition-transform duration-700 ease-in-out ${
          !isTransitioning ? "transition-none" : ""
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="min-w-full h-full relative flex flex-col sm:flex-row items-center justify-center overflow-hidden px-3 sm:px-0"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-center bg-cover scale-110 blur-lg"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Main artwork */}
            <img
              src={slide.image}
              alt={slide.title}
              className="relative z-10 max-h-[50%] sm:max-h-[80%] max-w-[95%] sm:max-w-[90%] object-contain rounded-md shadow-lg"
            />

            {/* Content */}
            <div className="relative z-10 text-white max-w-[90%] sm:max-w-[480px] text-center sm:text-left mt-4 sm:mt-0 sm:pl-10 md:pl-20">
              <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wide">
                {slide.artist}
              </h2>
              <p className="italic text-sm sm:text-lg mt-1 sm:mt-2">
                {slide.title}
              </p>

              <ul className="mt-2 sm:mt-3 space-y-1 text-xs sm:text-sm md:text-base leading-relaxed">
                {slide.details.map((line, i) => {
                  const isBold =
                    line.toLowerCase().includes("price realised") ||
                    line.toLowerCase().includes("sold for");
                  return (
                    <li
                      key={i}
                      className={`flex items-start justify-center sm:justify-start gap-2 ${
                        isBold ? "font-bold" : "font-normal"
                      }`}
                    >
                      {line}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div
        className="absolute top-1/2 left-3 sm:left-5 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-white/80 rounded-full cursor-pointer flex items-center justify-center hover:bg-white transition hidden sm:flex"
        onClick={prevSlide}
      >
        <FaChevronLeft className="text-[#0DBB56] text-base md:text-lg" />
      </div>
      <div
        className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-white/80 rounded-full cursor-pointer flex items-center justify-center hover:bg-white transition hidden sm:flex"
        onClick={nextSlide}
      >
        <FaChevronRight className="text-[#0DBB56] text-base md:text-lg" />
      </div>
    </div>
  );
};

export default Hero;
