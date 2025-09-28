// pages/Explore.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load universal wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (item, type) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const itemType = type || item.type || "products";
    const exists = savedWishlist.some((w) => w.id === item.id && w.type === itemType);

    let updated;
    if (exists) {
      updated = savedWishlist.filter((w) => !(w.id === item.id && w.type === itemType));
    } else {
      updated = [...savedWishlist, { ...item, type: itemType }];
      alert(`${item.name} added to wishlist!`);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const goToPage = (item) => {
    switch (item.type) {
      case "hotel":
        navigate(`/hotel/${item.id}`);
        break;
      case "car":
        navigate(`/car/${item.id}`);
        break;
      case "bus":
        navigate(`/buses/${item.id}`);
        break;
      case "guide": // <-- unified type
        navigate(`/guide/${item.id}`);
        break;
      case "products":
        navigate(`/products/${item.id}`);
        break;
      default:
        break;
    }
  };

  // Render wishlist items by type
  const renderWishlist = (type) => {
    const items = wishlist.filter((w) => w.type === type);
    if (items.length === 0) return <p className="text-gray-500">No {type}s wishlisted.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {items.map((item, index) => {
          const isInWishlist = wishlist.some((w) => w.id === item.id && w.type === type);

          return (
            <motion.div
              key={`${type}-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative cursor-pointer"
              onClick={() => goToPage(item)}
            >
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item, type);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "text-red-500" : "text-gray-400"}`} />
              </button>

              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                {item.price && <p className="text-green-700 font-bold text-sm mb-1">{item.price}</p>}
                {item.desc && <p className="text-gray-700 text-sm mb-1 flex-1">{item.desc}</p>}

                {/* Hotel Details */}
                {type === "hotel" && (
                  <>
                    <p className="text-gray-600 text-xs mb-1">{item.address}</p>
                    <p className="text-gray-600 text-xs mb-3">📞 {item.phone}</p>
                    <p className="text-yellow-500 font-semibold mb-3">⭐ {item.rating}</p>
                  </>
                )}

                {/* Guide Details */}
                {type === "guide" && (
                  <>
                    <p className="text-gray-600 text-xs mb-1">📞 {item.phone}</p>
                    <p className="text-gray-600 text-xs mb-1">
                      <strong>Languages:</strong> {item.languages?.join(", ")}
                    </p>
                    <p className="text-gray-600 text-xs mb-3">
                      <strong>Specialties:</strong> {item.specialties?.join(", ")}
                    </p>
                  </>
                )}

                {/* Car Details */}
                {type === "car" && item.driver && (
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={item.driver.img}
                      alt={item.driver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-800 font-semibold">{item.driver.name}</p>
                      <p className="text-gray-600 text-sm">{item.driver.language}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>
        <div className="flex gap-4">
          <Link to="/wishlist" className="text-green-700 font-semibold hover:underline">
            Wishlist ({wishlist.length})
          </Link>
          <Link to="/bookings" className="text-green-700 font-semibold hover:underline">
            Bookings
          </Link>
        </div>
      </div>

      {/* Sections */}
      <h2 className="text-2xl font-bold text-green-700 mb-4">Wishlisted Hotels</h2>
      {renderWishlist("hotel")}

      <h2 className="text-2xl font-bold text-green-700 mb-4">Wishlisted Cars</h2>
      {renderWishlist("car")}

      <h2 className="text-2xl font-bold text-green-700 mb-4">Wishlisted Buses</h2>
      {renderWishlist("bus")}

      <h2 className="text-2xl font-bold text-green-700 mb-4">Wishlisted Guides</h2>
      {renderWishlist("guide")}

      <h2 className="text-2xl font-bold text-green-700 mb-4">Wishlisted Products</h2>
      {renderWishlist("products")}
    </div>
  );
}
