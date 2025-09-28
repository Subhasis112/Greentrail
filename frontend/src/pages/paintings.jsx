import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { paintingsProducts } from "../data/initProducts";

export default function Paintings() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Toggle wishlist
  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      const updated = exists
        ? prev.filter((w) => w.id !== item.id)
        : [...prev, item];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredItems = paintingsProducts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 px-2 md:px-8 bg-white min-h-screen">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300 transition-all duration-300"
        >
          ← Back
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Paintings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[150px] border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 transition shadow-sm"
        />

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/wishlist")}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-all duration-300"
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-all duration-300"
          >
            Cart
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-all duration-300"
          >
            Your Orders
          </button>
        </div>
      </div>

      {/* Page Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-green-700">
        Paintings & Art
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, i) => {
            const isWishlisted = wishlist.some((w) => w.id === item.id);
            return (
              <div
                key={i}
                className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative cursor-pointer"
                onClick={() => navigate(`/Product/paintings/${item.id}`)}
              >
                {/* Wishlist Heart */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                  className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
                  />
                </button>

                {/* Product Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-green-700 font-bold text-sm mb-1">Price: {item.price} Rs</p>
                  
                  <p className="text-gray-700 text-sm mb-3 flex-1">{item.desc}</p>

                  {/* Comments */}
                  {/* <div className="mb-3 text-sm">
                    <p className="font-semibold mb-1">Comments:</p>
                    {item.comments.map((c, idx) => (
                      <p key={idx} className="text-gray-600 mb-1">
                        <span className="font-semibold">{c.user}:</span> {c.comment}
                      </p>
                    ))}
                  </div> */}

                  {/* Buy Button */}
                  {/* <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/purchase/${item.id}`); }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm self-start"
                  >
                    Buy Now
                  </button> */}
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-8">
            No items found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
