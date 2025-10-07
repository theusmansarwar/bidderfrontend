import React, { useState } from "react";

const FeaturedArtists = () => {
  const [expanded, setExpanded] = useState({});

  const featured = [
    {
      _id: 1,
      artistName: "Mashkoor Raza",
      title: "Abstract Horses",
      artistBio:
        "Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design.",
    },
    {
      _id: 2,
      artistName: "Waqar Ali",
      title: "Quranic Calligraphy Series",
      artistBio:
        "Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.",
    },
    {
      _id: 3,
      artistName: "Waqas Ali",
      title: "Contemporary Calligraphy 2024",
      artistBio:
        "Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design.",
    },
    {
      _id: 4,
      artistName: "Abdul Jabbar",
      title: "Mustard Fields (Landscape)",
      artistBio:
        "Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design. His art often focuses on spiritual verses, merging devotion with contemporary aesthetics.Waqar Ali is a celebrated calligrapher whose works combine classical Arabic scripts with modern design.",
    },
  ];

  const toggleBio = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-[90%] m-auto lg:w-full bg-white py-12">
      <div className="max-w-5xl ml-0 lg:ml-[10%]">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
          Featured Artists & Works
        </h2>

        <ul className="list-disc pl-6 space-y-6 marker:text-gray-700">
          {featured.map((artist) => (
            <li key={artist._id} className="pl-0">
              <div className="text-gray-800 leading-relaxed">
                <span className="font-semibold">{artist.artistName}</span> –{" "}
                <span className="italic text-gray-700">{artist.title}</span>
              </div>

              <p
                className={`pr-2.5 text-gray-600 text-sm mt-2 transition-all duration-300 lg:text-justify text:left max-h-[300px] overflow-auto custom-scrollbar ${
                  expanded[artist._id]
                    ? "line-clamp-none"
                    : "line-clamp-2 overflow-hidden"
                }`}
              >
                {artist.artistBio}
              </p>

              {artist.artistBio.length > 100 && (
                <button
                  onClick={() => toggleBio(artist._id)}
                  className="text-[#0DBB56] hover:underline text-sm font-medium mt-2 cursor-pointer"
                >
                  {expanded[artist._id] ? "See less" : "See more"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedArtists;
