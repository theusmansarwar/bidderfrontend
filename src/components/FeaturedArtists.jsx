import React from "react";

const FeaturedArtists = () => {
  const artists = [
    {
      name: "Mashkoor Raza",
      work: "Abstract Horses, Polo Horses, Horses",
    },
    {
      name: "Waqar Ali",
      work: "Quranic calligraphy (Sura Waqia, Sura Baqra, Darud Pak)",
    },
    {
      name: "Waqas Ali",
      work: "Contemporary calligraphy series (2024)",
    },
    {
      name: "Abdul Jabbar",
      work: "Mustard Fields (landscape)",
    },
    {
      name: "Ahmed Khan",
      work: "Calligraphy (2017)",
    },
    {
      name: "Pervez Rana",
      work: "Old Lahore",
    },
    {
      name: "M. Tariq Gill",
      work: "Wazir Khan Mosque",
    },
    {
      name: "Gulgee",
      work: "Color Composition (1997)",
    },
    {
      name: "Jamal Ahmed",
      work: "Lilies",
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-5xl ml-[10%]">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
          Featured Artists & Works
        </h2>

        <ul className="flex flex-col gap-2.5">
          {artists.map((artist, index) => (
            <li key={index} className="list-disc">
              <span className="font-semibold text-gray-900">{artist.name}</span>{" "}
              – {artist.work}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedArtists;
