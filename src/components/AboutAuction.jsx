import React from "react";

const AboutAuction = () => {
  return (
    <div className="w-full bg-[#F7F7F7] mt-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-10 md:py-16">
      {/* Text Section */}
      <div className="w-full md:w-2/5 flex flex-col gap-2 md:gap-4 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
          About the Auction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Moawin Art Auction is made possible through the generous support
          of Eye for Art USA.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By bidding on exclusive artworks donated by renowned artists, you not
          only take home a timeless masterpiece but also help fund schools,
          teacher training, and vocational opportunities for underprivileged
          communities in Pakistan.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-2/5 flex justify-center">
        <img
          className="w-full max-w-full h-52 md:h-72 md:max-w-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] object-cover"
          src="/about-auction.jpg"
          alt="Moawin"
        />
      </div>
    </div>
  );
};

export default AboutAuction;
