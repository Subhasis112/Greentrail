import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cars } from "../data/initCars";

export default function Cars() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (car) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = savedWishlist.some((w) => w.id === car.id && w.type === "car");

    let updatedWishlist;
    if (exists) {
      updatedWishlist = savedWishlist.filter((w) => !(w.id === car.id && w.type === "car"));
    } else {
      updatedWishlist = [...savedWishlist, { ...car, type: "car" }];
      alert(`${car.name} added to wishlist!`);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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
          <Link
            to="/wishlist"
            className="text-green-700 font-semibold hover:underline"
          >
            Wishlist ({wishlist.filter(w => w.type === "car").length})
          </Link>
          <Link
            to="/bookings"
            className="text-green-700 font-semibold hover:underline"
          >
            Bookings
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
        Cars & Cabs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => {
          const isWishlisted = wishlist.some((w) => w.id === car.id && w.type === "car");

          return (
            <div
              key={car.id}
              className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col cursor-pointer relative"
              onClick={() => navigate(`/car/${car.id}`)}
            >
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to car page
                  toggleWishlist(car);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 z-10"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
                />
              </button>

              {/* Car Image */}
              <img
                src={car.img}
                alt={car.name}
                className="h-32 w-full object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-green-700 font-bold">{car.price}</p>
                <p className="text-gray-700 text-sm">{car.desc}</p>

                {/* Driver Info */}
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={car.driver.img}
                    alt={car.driver.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-800 font-semibold">{car.driver.name}</p>
                    <p className="text-gray-600 text-sm">{car.driver.language}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
