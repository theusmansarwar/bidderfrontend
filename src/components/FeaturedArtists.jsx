import React, { useState, useEffect } from "react";
import { getFeaturedArtists } from "../DAL/Fetch";

const FeaturedArtists = () => {
  const [featured, setFeatured] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleBio = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        setLoading(true);
        const res = await getFeaturedArtists(5);

        if (res && res.status === 200 && res.artists) {
          setFeatured(res.artists);
        } else {
          setError("Failed to fetch featured artists.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArtists();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading artists...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-medium">{error}</div>
    );
  }

  return (
    <section className="w-[90%] m-auto lg:w-full bg-white py-12">
      <div className="max-w-5xl ml-0 lg:ml-[10%]">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
          Featured Artists & Works
        </h2>

        {featured.length === 0 ? (
          <p className="text-gray-600 text-center">
            No featured artists found.
          </p>
        ) : (
          <ul className="list-disc pl-6 space-y-6 marker:text-gray-700">
            {featured.map((artist) => (
              <li key={artist._id} className="pl-0">
                <div className="text-gray-800 leading-relaxed">
                  <span className="font-semibold">{artist.artistName}</span>{" "}
                  <span className="italic text-gray-700">
                    (
                    {artist.products && artist.products.length > 0
                      ? artist.products.map((p) => p.title).join(", ")
                      : "No artworks"}
                    )
                  </span>
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

                {artist.artistBio?.length > 100 && (
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
        )}
      </div>
    </section>
  );
};

export default FeaturedArtists;
