import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../config/Config";
import BiddingList from "../components/BiddingList";
import { placeBid } from "../DAL/Create";
import { getProductById } from "../DAL/Fetch";
import Button from "../components/Button";
import { GiSandsOfTime } from "react-icons/gi";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [highestBid, setHighestBid] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);

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

  // 🕒 Auction countdown timer
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
      if (days > 0) formatted = `${days}d ${hours}h ${minutes}m`;
      else if (hours > 0) formatted = `${hours}h ${minutes}m ${seconds}s`;
      else formatted = `${minutes}m ${seconds}s`;

      setTimeLeft(formatted);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product]);

  // 💵 Place bid
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

  // 🗓️ Format auction date (12-hour + timezone)
  const formatAuctionDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });

    return `${formattedDate} | starting at ${formattedTime}`;
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

 

  return (
    <div className="w-[90%] mx-auto py-6 lg:py-10 mt-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT: Image + Details */}
        <div className="w-full lg:w-[65%] flex flex-col items-start">
          <img
            src={`${baseUrl}${product.image}`}
            alt={product.title}
            className="w-full max-w-full h-[400px] object-cover rounded-lg shadow-lg border border-gray-100"
          />

          <div className="w-full bg-white mt-6 p-4 rounded-lg shadow-md border border-gray-100 space-y-4">
            <div className="w-full flex gap-5 items-center justify-between">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <Button
                title="Back To Art"
                onClick={() => navigate("/#products")}
              />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: product?.description || "",
              }}
            />

            <p className="font-semibold text-lg text-gray-700">
              Artist:{" "}
              <span className="font-normal text-base text-gray-700">
                {product.artistName}
              </span>
            </p>
            <p className="font-semibold text-lg text-gray-700">
              Country:{" "}
              <span className="font-normal text-base text-gray-700">
                {product.artistCountry}
              </span>
            </p>

            {/* 🕓 Status */}
            <p className="font-medium text-lg text-gray-700">
              <span>Status:</span>{" "}
              {product.soldOut ? (
                <span className="text-red-500 font-normal">Sold</span>
              ) : (
                <span className="text-green-600 font-normal">Available</span>
              )}
            </p>

            {/* 💰 Bidding Info */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
              <span className="text-gray-700 font-medium">
                {highestBid ? "Current Highest Bid:" : "Starting Bid:"}
              </span>
              <span className="text-[#0DBB56] font-semibold text-lg">
                ${highestBid || product.minimumBid}
              </span>
            </div>
            {/* 🗓️ Auction Dates */}
            <p className="font-medium text-[14px] text-gray-700">
              <span className="text-gray-600  uppercase">
                {formatAuctionDate(product.auctionStartDate)}
              </span>
            </p>

            {/* ⏳ Time Left */}
            <p className="text-red-500 font-medium text-sm flex items-center gap-1">
              <GiSandsOfTime className="text-gray-700 shrink-0 text-lg" />
              Time Left: {timeLeft}
            </p>

            {/* 💸 Place Bid */}
            <div className="mt-2 flex flex-col gap-3">
              <div className="relative w-full md:w-80">
                <span className="absolute left-3 top-[8px] text-gray-500">
                  $
                </span>
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

        {/* RIGHT: Bidding List */}
        <div className="w-full lg:w-[20%] lg:ml-0">
          <BiddingList productId={id} onHighestBidChange={setHighestBid} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
