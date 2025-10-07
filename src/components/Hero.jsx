import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroData.length);
  };

  return (
    <div className="bg-transparent relative w-[94%] sm:w-[90%] m-auto h-[360px] sm:h-[420px] md:h-[520px] mt-6 md:mt-8 overflow-hidden rounded-lg shadow-lg">
      {/* Top-right text */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 z-20 bg-black/40 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-base font-medium tracking-wide">
        Pakistani Artists’ Historical Results
      </div>

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroData.map((slide, index) => {
          const hideMainImageOnMobile = index >= heroData.length - 3; // last 3 slides
          const isFirstSlide = index === 0; // only blur first slide bg on mobile
          return (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex flex-col sm:flex-row items-center justify-center overflow-hidden px-3 sm:px-0"
            >
              {/* Background — blur only for first slide on mobile */}
              <div
                className={`absolute inset-0 bg-center bg-cover scale-110 ${
                  isFirstSlide ? "blur-sm sm:blur-lg" : "sm:blur-lg"
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Main artwork */}
              <img
                src={slide.image}
                alt={slide.title}
                className={`relative z-10 max-h-[70%] sm:max-h-[80%] max-w-[95%] sm:max-w-[90%] object-contain rounded-md shadow-lg ${
                  hideMainImageOnMobile ? "hidden sm:block" : ""
                }`}
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
                    // Bold “Price Realised” and “Sold For” lines
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
          );
        })}
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

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {heroData.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full cursor-pointer transition-all ${
              current === index
                ? "bg-[#0DBB56] scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;
