// src/pages/Guides.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { guides } from "../data/initGuides";

export default function Guides() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load universal wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Toggle wishlist for guides
  const toggleWishlist = (guide) => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = stored.some((g) => g.id === guide.id && g.type === "guide");

    let updated;
    if (exists) {
      updated = stored.filter((g) => !(g.id === guide.id && g.type === "guide"));
    } else {
      updated = [...stored, { ...guide, type: "guide" }];
      alert(`${guide.name} added to wishlist!`);
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/wishlist")}
            className="text-green-700 font-semibold hover:underline"
          >
            Wishlist ({wishlist.filter((w) => w.type === "guide").length})
          </button>
          <Link to="/bookings" className="text-green-700 font-semibold hover:underline">
            Bookings
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
        Guides in Jharkhand
      </h2>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, i) => {
          const isWishlisted = wishlist.some((w) => w.id === guide.id && w.type === "guide");

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative cursor-pointer"
              onClick={() => navigate(`/guide/${guide.id}`)}
            >
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(guide);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
              </button>

              {/* Guide Image */}
              <img
                src={guide.img}
                alt={guide.name}
                className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{guide.name}</h3>
                <p className="text-gray-700 text-sm mb-1 flex-1">{guide.desc}</p>
                <p className="text-yellow-500 font-semibold mb-1">⭐ {guide.rating}</p>
                <p className="text-gray-600 text-xs mb-1">📞 {guide.phone}</p>
                <p className="text-gray-600 text-xs mb-1">
                  <strong>Languages:</strong> {guide.languages.join(", ")}
                </p>
                <p className="text-gray-600 text-xs mb-3">
                  <strong>Specialties:</strong> {guide.specialties.join(", ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
