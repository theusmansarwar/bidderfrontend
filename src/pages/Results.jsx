import React, { useEffect, useState } from "react";
import { getAllProducts } from "../DAL/Fetch";
import { baseUrl } from "../config/Config";

const Results = () => {
  const [soldOutProducts, setSoldOutProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const soldOut = res?.products?.filter((p) => p.soldOut === true) || [];
        setSoldOutProducts(soldOut);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //  Show loading spinner or text
  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  // Handle no sold-out products
  if (soldOutProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        No sold-out products found.
      </div>
    );
  }

  return (
    <div className="px-6 py-10 bg-gray-50 ">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-4 border-[#0DBB56] inline-block pb-2">
        Sold Out Artworks
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {soldOutProducts.map((item) => {
          const latestBid =
            item.bids && item.bids.length > 0
              ? item.bids[item.bids.length - 1].bidAmount
              : null;

          return (
            <div
              key={item._id}
              className="group relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={baseUrl + item.image}
                  alt={item.title}
                  className="w-full h-52 object-cover opacity-80 group-hover:opacity-90 transition-all duration-300"
                />

                {/* SOLD OUT Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-700 to-red-500 text-white text-[13px] font-semibold px-3 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
                  Sold Out
                </div>
              </div>

              {/* Details */}
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.title}
                </h3>
                {item.artist && (
                  <p className="text-gray-600 text-sm mb-3 italic">
                    by {item.artist.artistName}
                  </p>
                )}

                <div className="text-sm text-gray-700 space-y-1.5">
                  <p>
                    <span className="font-medium text-gray-800">Medium:</span>{" "}
                    {item.description?.includes("Medium:")
                      ? item.description.match(/Medium:([^<]*)/i)?.[1]?.trim()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Size:</span>{" "}
                    {item.description?.includes("Size:")
                      ? item.description.match(/Size:([^<]*)/i)?.[1]?.trim()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Starting Bid:
                    </span>{" "}
                    $ {item.minimumBid.toLocaleString()}
                  </p>
                  {latestBid && (
                    <p>
                      <span className="font-medium text-gray-800">
                        Last Bid:
                      </span>{" "}
                      $ {latestBid.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Overlay */}
              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-medium tracking-wide">
                  Auction Closed
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
