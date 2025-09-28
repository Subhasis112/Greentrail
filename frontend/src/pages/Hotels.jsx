// pages/Hotels.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { hotels } from "../data/initHotels";

export default function Hotels() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load universal wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (hotel) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = savedWishlist.some((w) => w.id === hotel.id && w.type === "hotel");

    let updated;
    if (exists) {
      updated = savedWishlist.filter((w) => !(w.id === hotel.id && w.type === "hotel"));
    } else {
      updated = [...savedWishlist, { ...hotel, type: "hotel" }];
      alert(`${hotel.name} added to wishlist!`);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const goToHotelPage = (hotel) => {
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <Link to="/" className="text-green-700 font-semibold hover:underline">
          ← Back
        </Link>

        <div className="flex gap-4">
          <Link to="/wishlist" className="text-green-700 font-semibold hover:underline">
            Wishlist ({wishlist.filter(w => w.type === "hotel").length})
          </Link>
          <Link to="/bookings" className="text-green-700 font-semibold hover:underline">
            Bookings
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
        Hotels & Resorts
      </h2>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => {
          const isWishlisted = wishlist.some((w) => w.id === hotel.id && w.type === "hotel");

          return (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative cursor-pointer"
              onClick={() => goToHotelPage(hotel)}
            >
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(hotel);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
              </button>

              {/* Hotel Image */}
              <img
                src={hotel.img}
                alt={hotel.name}
                className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                <p className="text-green-700 font-bold text-sm mb-1">{hotel.price}</p>
                <p className="text-gray-700 text-sm mb-1 flex-1">{hotel.desc}</p>
                <p className="text-gray-600 text-xs mb-1">{hotel.address}</p>
                <p className="text-gray-600 text-xs mb-3">📞 {hotel.phone}</p>
                <p className="text-yellow-500 font-semibold mb-3">⭐ {hotel.rating}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
