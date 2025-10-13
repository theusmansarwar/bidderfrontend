import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config/Config";
import BiddingList from "../components/BiddingList";
import { placeBid } from "../DAL/Create";
import { getProductById } from "../DAL/Fetch";
import Button from "../components/Button";
import { GiSandsOfTime } from "react-icons/gi";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [highestBid, setHighestBid] = useState(0);
  const [showBidError, setShowBidError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Modal control
  const [modalType, setModalType] = useState(null);
  const toggleModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Image zoom modal control
  const [isZoomed, setIsZoomed] = useState(false);
  const openZoom = () => setIsZoomed(true);
  const closeZoom = () => setIsZoomed(false);

  // ✅ Currency formatting
  const formatPrice = (value) => {
    const num = Number(value) || 0;
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // 🔹 Fetch product by ID
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await getProductById(id);
        if (res?.product) setProduct(res.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductById();
  }, [id]);

  // 🔹 Countdown timer
  useEffect(() => {
    if (!product?.auctionEndDate) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(product.auctionEndDate);
      const diff = end - now;

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

  // 🔹 Place bid handler
  const handlePlaceBid = async () => {
    if (!user) {
      toggleModal("signup");
      return;
    }

    const minBid = Number(highestBid) || Number(product?.minimumBid) || 0;

    if (!bidPrice || Number(bidPrice) <= minBid) {
      toast.error(`Bid must be higher than ${formatPrice(minBid)}`);
      setShowBidError(true);
      return;
    }
    setShowConfirmModal(true);
  };
  const confirmPlaceBid = async () => {
    const bidData = {
      productId: id,
      bidderId: user._id,
      bidAmount: Number(bidPrice),
    };

    try {
      await placeBid(bidData);
      toast.success("Bid placed successfully!");
      setBidPrice("");
      setHighestBid(Number(bidPrice));
      setShowBidError(false);
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error(error.response?.data?.message || "Failed to place bid");
    } finally {
      setShowConfirmModal(false);
    }
  };

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
    });
    return `${formattedDate} | ${formattedTime}`;
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="w-[90%] mx-auto pb-5 overflow-x-hidden">
        {/* Image container with zoom icon */}
        {/* Image Container with Zoom Cursor (Desktop) and Click Zoom (Mobile) */}
        <div
          className="relative w-full lg:h-[400px] h-[300px] overflow-hidden rounded-lg shadow-lg border border-gray-100 flex items-center justify-center bg-gray-100 group"
          onClick={openZoom} // works for mobile tap
        >
          {/* Blurred Background */}
          <img
            src={`${baseUrl}${product.image}`}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-50"
          />

          {/* Main Image */}
          <img
            src={`${baseUrl}${product.image}`}
            alt={product.title}
            className="relative max-h-[90%] max-w-[90%] object-contain rounded-md shadow-xl transition-transform duration-300 z-1"
          />

          {/* Zoom Overlay — visible only on desktop */}
          <div
            className="hidden lg:flex absolute inset-0 z-20   items-center justify-center transition-all"
            style={{ cursor: "zoom-in" }}
          >
            {/* <FaSearchPlus className="text-white text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300" /> */}
          </div>
        </div>

        {/* Details + Bidding */}
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* Left: Details */}
          <div className="w-full lg:w-[70%] bg-white p-4 rounded-lg shadow-md border border-gray-100 space-y-4">
            <div className="w-full lg:flex gap-5 items-center justify-between">
              <h2 className="text-2xl mb-2.5 lg:mb-0 md:text-4xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <Button
                title="Back To Art"
                onClick={() => navigate("/#artworks")}
              />
            </div>

            <div
              className="list-none"
              dangerouslySetInnerHTML={{ __html: product?.description || "" }}
            />

            <p className="font-normal text-base text-gray-700">
              Artist:{" "}
              <span className="font-semibold text-base text-gray-700">
                {product.artist.artistName}
              </span>
            </p>

            <p className="font-normal text-base text-gray-700">
              Starting Bid:{" "}
              <span className="font-semibold text-base text-gray-700">
                {formatPrice(product.minimumBid)}
              </span>
            </p>

            <p className="font-normal text-base text-gray-700">
              Status:{" "}
              {product.soldOut ? (
                <span className="text-red-500 font-semibold">Sold</span>
              ) : (
                <span className="text-green-600 font-semibold">Available</span>
              )}
            </p>

            <div className="flex items-center my-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-green-600 font-medium text-sm">
                Start Bid Now
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Auction Dates */}
            <div className="font-normal text-base text-gray-700 space-y-1">
              <p>
                <span className="text-gray-600">Starting At: </span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">
                  {formatAuctionDate(product.auctionStartDate)}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Ending At: </span>
                <span className="font-semibold text-sm lg:text-base text-gray-800">
                  {formatAuctionDate(product.auctionEndDate)}
                </span>
              </p>
            </div>

            <p className="text-[#0DBB56] font-medium text-sm flex items-center gap-1">
              <GiSandsOfTime className="text-gray-700 shrink-0 text-lg" />
              Time Left: {timeLeft}
            </p>

            {/* Place Bid */}
            <div className="mt-2 flex flex-col gap-3">
              <div className="relative w-full lg:flex gap-2.5 items-center">
                <span className="absolute left-3 top-[8px] text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidPrice}
                  onChange={(e) => {
                    setBidPrice(e.target.value);
                    setShowBidError(false);
                  }}
                  className={`border rounded-md pl-7 pr-3 py-2 w-full lg:w-[300px] outline-0 transition ${
                    showBidError
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-[#0DBB56]/30"
                  }`}
                />
                <button
                  onClick={handlePlaceBid}
                  className="mt-2.5 lg:mt-0 w-full lg:w-fit bg-[#0DBB56] text-white px-6 py-2 rounded-md hover:bg-[#0DBB56]/90 transition cursor-pointer"
                >
                  Place Bid
                </button>
              </div>

              <p
                className={`text-sm ${
                  showBidError ? "text-red-500 font-medium" : "text-gray-500"
                }`}
              >
                (Enter more than {" "}
                {formatPrice(highestBid || product.minimumBid)})
              </p>
            </div>
          </div>

          {/* Right: Bidding List */}
          <div className="w-full lg:w-[30%]">
            <BiddingList productId={id} onHighestBidChange={setHighestBid} />
          </div>
        </div>
      </div>

      {/* 🔍 Fullscreen Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={closeZoom}
        >
          <button
            onClick={closeZoom}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 cursor-pointer"
          >
            <FaTimes />
          </button>
          <img
            src={`${baseUrl}${product.image}`}
            alt={product.title}
            className="max-w-[90%] max-h-[90%] object-contain rounded-md"
          />
        </div>
      )}

      {/* Auth Modals */}
      {modalType === "signin" && (
        <Signin
          onSignUpClick={() => toggleModal("signup")}
          onClose={closeModal}
          onSignInSuccess={closeModal}
        />
      )}
      {modalType === "signup" && (
        <Signup
          onClose={closeModal}
          onSignInClick={() => toggleModal("signin")}
          onSignupSuccess={closeModal}
        />
      )}
      {/* ✅ Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Confirm Your Bid
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to place a bid of{" "}
              <span className="font-bold text-gray-900">
                {formatPrice(bidPrice)}
              </span>{" "}
              for <span className="font-semibold">{product.title}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmPlaceBid}
                className="px-4 py-2 rounded-md bg-[#0DBB56] text-white hover:bg-[#0DBB56]/90 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
