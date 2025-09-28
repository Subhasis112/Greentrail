import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { buses } from "../data/initBuses";

export default function Buses() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load universal wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (bus) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = savedWishlist.some((w) => w.id === bus.id && w.type === "bus");

    let updated;
    if (exists) {
      updated = savedWishlist.filter((w) => !(w.id === bus.id && w.type === "bus"));
    } else {
      updated = [...savedWishlist, { ...bus, type: "bus" }];
      alert(`${bus.name} added to wishlist!`);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>

        <div className="flex gap-4">
          <button
            className="text-green-700 font-semibold hover:underline"
            onClick={() => navigate("/wishlist")}
          >
            Wishlist ({wishlist.filter(w => w.type === "bus").length})
          </button>
          <button
            className="text-green-700 font-semibold hover:underline"
            onClick={() => navigate("/bookings")}
          >
            Bookings
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
        Available Buses
      </h2>

      {/* Buses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => {
          const isWishlisted = wishlist.some((w) => w.id === bus.id && w.type === "bus");

          return (
            <div
              key={bus.id}
              className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative cursor-pointer"
              onClick={() => navigate(`/buses/${bus.id}`)}
            >
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  toggleWishlist(bus);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
                />
              </button>

              {/* Bus Image */}
              <img
                src={bus.img}
                alt={bus.name}
                className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{bus.name}</h3>
                <p className="text-gray-700 text-sm mb-1 flex-1">{bus.desc}</p>

                {/* Book Now Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booking/bus/${bus.id}`);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm mt-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
