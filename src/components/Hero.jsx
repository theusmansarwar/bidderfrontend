import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const heroData = [
  {
    id: 1,
    image: "/painting.webp",
    title1: "Lorem ipsum",
    title2: "consectetur adipisicing",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab voluptatibus exercitationem, commodi dolorem voluptatum consectetur",
    btn: { text: "Learn More", link: "/contact-us" },
  },
  {
    id: 2,
    image: "/painting.webp",
    title1: "Lorem ipsum",
    title2: "consectetur adipisicing",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab voluptatibus exercitationem, commodi dolorem voluptatum consectetur",
    btn: { text: "Learn More", link: "/contact-us" },
  },
  {
    id: 3,
    image: "/painting.webp",
    title1: "Lorem ipsum",
    title2: "consectetur adipisicing",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab voluptatibus exercitationem, commodi dolorem voluptatum consectetur",
    btn: { text: "Learn More", link: "/contact-us" },
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroData.length);
  };

  return (
    <div className="relative w-[90%] m-auto h-[400px] mt-[20px] overflow-hidden md:h-[500px] rounded-lg">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroData.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full flex items-center pl-[10%] md:pl-[5%] bg-center bg-cover bg-no-repeat "
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="flex flex-col gap-4 text-white max-w-[400px] lg:ml-[5%] z-10">
              <h1 className="uppercase leading-tight">
                <span className="block text-xl md:text-3xl font-bold">
                  {slide.title1}
                </span>
                <span className="block text-xl md:text-3xl font-bold">
                  {slide.title2}
                </span>
              </h1>
              <p className="text-sm md:text-sm leading-relaxed capitalize">
                {slide.desc}
              </p>
              <button className="w-fit px-6 py-1 border text-white font-medium rounded-lg cursor-pointer hover:opacity-90 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div
        className="absolute top-1/2 left-5 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full cursor-pointer flex items-center justify-center hover:bg-white transition hidden md:flex"
        onClick={prevSlide}
      >
        <FaChevronLeft className="text-[#0DBB56] text-lg" />
      </div>
      <div
        className="absolute top-1/2 right-5 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full cursor-pointer flex items-center justify-center hover:bg-white transition hidden md:flex"
        onClick={nextSlide}
      >
        <FaChevronRight className="text-[#0DBB56] text-lg" />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {heroData.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
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
