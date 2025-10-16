"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getLatestBids } from "../DAL/Fetch";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BiddingChart = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Format currency safely
  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // 🔹 Fetch latest bids on page load
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await getLatestBids();
        if (res?.latestBids) {
          setBids(res.latestBids);
        }
      } catch (error) {
        console.error("❌ Error fetching latest bids:", error);
      }
    };
    fetchBids();
  }, []);

  // 🔹 Connect to WebSocket server
  useEffect(() => {
    const newSocket = io("https://moawinauctionusa.org/", {
      path: "/backend/socket.io",
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    // Ask server for latest bids on connect
    newSocket.on("connect", () => {
      console.log("✅ Connected to socket");
      newSocket.emit("latestBids");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 🔹 Listen for real-time latest bids
  useEffect(() => {
    if (!socket) return;

    const handleLatestBids = (latestBids) => {
      console.log("📢 Received latest 5 bids:", latestBids);
      setBids(latestBids);
    };

    socket.on("latestBids", handleLatestBids);

    return () => {
      socket.off("latestBids", handleLatestBids);
    };
  }, [socket]);

  return (
    <div className="w-[90%] mt-10 m-auto py-8 border border-gray-200 p-4 rounded-xl shadow-md bg-white transition-all duration-300 hover:shadow-lg overflow-auto">
      <div className="w-full flex flex-col justify-center gap-2 items-center lg:flex-row lg:justify-between mb-5">
        {" "}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
          Live Bids
        </h2>
        <Button
          title="Art Work"
          onClick={() => {
            const element = document.getElementById("artworks");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />
      </div>

      {bids.length > 0 ? (
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-3 py-2 border-b border-gray-200 min-w-[50px]">
                Sr #
              </th>
              <th className="px-3 py-2 border-b border-gray-200 min-w-[160px]">
                Bidder Name
              </th>
              <th className="px-3 py-2 border-b border-gray-200 min-w-[220px]">
                Art Name
              </th>
              <th className="px-3 py-2 border-b border-gray-200 text-right min-w-[120px]">
                Amount
              </th>

              {/* ✅ Align Action column center */}
              <th className="px-3 py-2 border-b border-gray-200 text-center min-w-[120px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bids.map((b, i) => (
              <tr
                key={b._id || i}
                className={`transition-all duration-200 cursor-pointer ${
                  i === 0
                    ? "bg-green-50 font-semibold text-green-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-3 py-2 border-b border-gray-100">{i + 1}</td>
                <td className="px-3 py-2 border-b border-gray-100">
                  {b.bidder?.name || "Anonymous"}
                </td>
                <td className="px-3 py-2 border-b border-gray-100">
                  {b.product?.title || "Unknown Product"}
                </td>
                <td
                  className={`px-3 py-2 border-b border-gray-100 text-right ${
                    i === 0 ? "text-green-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  {formatCurrency(b.bidAmount)}
                </td>

                {/* ✅ Centered View Button */}
                <td className="px-3 py-2 border-b border-gray-100 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click if present
                      navigate(`/art/${b.product._id}`);
                    }}
                    className=" hover:opacity-90 text-gray-700 text-base px-6 py-1.5 rounded transition-all cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm italic text-center py-3">
          Waiting for live bids...
        </p>
      )}
    </div>
  );
};

export default BiddingChart;
