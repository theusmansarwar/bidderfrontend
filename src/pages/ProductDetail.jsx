import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../config/Config";
import BiddingList from "../components/BiddingList";
import { placeBid } from "../DAL/Create";
import { getProductById } from "../DAL/Fetch";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [highestBid, setHighestBid] = useState(0);

  // ✅ Fetch product
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res?.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductById();
  }, [id]);

  // Auction timer (display: show days only if >24h)
  useEffect(() => {
    if (!product?.auctionEndDate) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(product.auctionEndDate);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Auction Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let formatted = "";

      if (days > 0) {
        formatted = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        formatted = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        formatted = `${minutes}m ${seconds}s`;
      }

      setTimeLeft(formatted);
    };

    updateTimer(); // Run immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [product]);

  // 🟣 Handle bid submission
  const handlePlaceBid = async () => {
    if (!bidPrice || bidPrice <= (highestBid || product.minimumBid)) {
      toast.error(
        `Bid must be higher than $${highestBid || product.minimumBid}`
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please sign in to place a bid");
      return;
    }

    const bidData = {
      productId: id,
      bidderId: user.user._id,
      bidAmount: Number(bidPrice),
    };

    try {
      await placeBid(bidData);
      toast.success("Bid placed successfully!");
      setBidPrice("");
      const newBid = Number(bidPrice);
      setHighestBid(newBid);
      setProduct((prev) => ({
        ...prev,
        minimumBid: newBid,
      }));
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error(error.response?.data?.message || "Failed to place bid");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-[90%] mx-auto py-6 lg:py-10 mt-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-12 ">
        {/* LEFT: Image + Details */}
        <div className="w-full lg:w-[65%] flex flex-col items-start">
          {/* Product Image */}
          <img
            src={`${baseUrl}${product.image}`}
            alt={product.title}
            className="w-full max-w-full h-[400px] object-cover rounded-lg shadow-lg border border-gray-100"
          />

          {/* Product Details */}
          <div className="w-full bg-white mt-6 p-4 rounded-lg shadow-md border border-gray-100 space-y-4">
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600">By {product.artistName}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description || "",
              }}
            />
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              {product.soldOut ? (
                <span className="text-red-500 font-medium">Sold</span>
              ) : (
                <span className="text-green-600 font-medium">Available</span>
              )}
            </p>

            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
              <span className="text-gray-700 font-medium">
                {highestBid ? "Current Highest Bid:" : "Starting Bid:"}
              </span>
              <span className="text-[#0DBB56] font-semibold text-lg">
                ${highestBid || product.minimumBid}
              </span>
            </div>

            <p className="text-red-500 font-medium text-sm">
              ⏳ Time Left: {timeLeft}
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <div className="relative w-full md:w-80">
                <span className="absolute left-3 top-[8px] text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Enter your bid"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  className="border border-gray-300 rounded-md pl-7 pr-3 py-2 w-full focus:ring-1 focus:ring-[#0DBB56]/30 outline-none transition"
                />
              </div>

              <p className="text-sm text-gray-500">
                (Enter more than or equal to ${highestBid || product.minimumBid}
                )
              </p>
              <button
                onClick={handlePlaceBid}
                className="w-40 bg-[#0DBB56] text-white px-6 py-2 rounded-md hover:bg-[#0DBB56]/90 transition cursor-pointer"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[20%] lg:ml-0">
          <BiddingList productId={id} onHighestBidChange={setHighestBid} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
