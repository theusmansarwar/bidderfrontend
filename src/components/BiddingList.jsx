import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getProductById } from "../DAL/Fetch";

const BiddingList = ({ productId, onHighestBidChange }) => {
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  const [socket, setSocket] = useState(null);

  // 🔹 Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io("https://auction.ztesting.site", {
      path: "/backend/socket.io", // matches NGINX proxy
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // cleanup on unmount
    };
  }, []);

  // 🔹 Fetch initial product data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(productId);
      const product = res.product;
      const productBids = product.bids || [];

      setBids(productBids);

      if (productBids.length > 0) {
        const maxBid = Math.max(...productBids.map((b) => b.bidAmount));
        setHighestBid(maxBid);
        onHighestBidChange(maxBid);
      } else {
        setHighestBid(product.minimumBid || 0);
        onHighestBidChange(product.minimumBid || 0);
      }
    };

    fetchProduct();
  }, [productId, onHighestBidChange]);

  // 🔹 Real-time socket updates
  useEffect(() => {
    if (!socket) return;

    const handleBidUpdated = (data) => {
      if (data.productId === productId) {
        setHighestBid(data.bidAmount);
        onHighestBidChange(data.bidAmount);

        setBids((prev) => [
          { bidder: data.bidderId, bidAmount: data.bidAmount },
          ...prev.slice(0, 9), // Keep top 10 bids
        ]);
      }
    };

    socket.on("bidUpdated", handleBidUpdated);
    return () => socket.off("bidUpdated", handleBidUpdated);
  }, [socket, productId, onHighestBidChange]);

  return (
    <div className=" border border-gray-200 p-4 rounded-xl shadow-md bg-white w-full transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl md:text-4xl text-center font-semibold text-gray-800 mb-2.5">
         Auction List
      </h2>

      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg mb-5">
        <span className="text-gray-700 font-medium">Current Highest Bid:</span>
        <span className="text-lg font-semibold text-green-600">
          ${highestBid}
        </span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-3">Recent Bids</h3>

      <div className="max-h-56 overflow-y-auto pr-2 custom-scrollbar">
        {bids.length > 0 ? (
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-3 py-2 border-b border-gray-200">#</th>
                <th className="px-3 py-2 border-b border-gray-200">Bidder</th>
                <th className="px-3 py-2 border-b border-gray-200 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {bids.map((b, i) => (
                <tr
                  key={i}
                  className={`transition-all duration-200 ${
                    i === 0
                      ? "bg-green-50 font-semibold text-green-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-3 py-2 border-b border-gray-100">
                    {i + 1}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-100">
                    {b.bidder?.name || "Anonymous"}
                  </td>
                  <td
                    className={`px-3 py-2 border-b border-gray-100 text-right ${
                      i === 0 ? "text-green-600 font-semibold" : "text-gray-800"
                    }`}
                  >
                    ${b.bidAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-sm italic text-center py-3">
            No bids yet
          </p>
        )}
      </div>
    </div>
  );
};

export default BiddingList;
