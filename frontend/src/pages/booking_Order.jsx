// pages/BookingOrder.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function BookingOrder() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [buses, setBuses] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productBookings")) || []);
    setHotels(JSON.parse(localStorage.getItem("hotelBookings")) || []);
    setCars(JSON.parse(localStorage.getItem("carBookings")) || []);
    setBuses(JSON.parse(localStorage.getItem("busBookings")) || []);
    setGuides(JSON.parse(localStorage.getItem("guideBookings")) || []);
  }, []);

  const removeBooking = (item, type) => {
    let storageKey = "";
    switch (type) {
      case "product":
        storageKey = "productBookings";
        setProducts((prev) => prev.filter((p) => p.name !== item.name));
        break;
      case "hotel":
        storageKey = "hotelBookings";
        setHotels((prev) => prev.filter((h) => h.name !== item.name));
        break;
      case "car":
        storageKey = "carBookings";
        setCars((prev) => prev.filter((c) => c.name !== item.name));
        break;
      case "bus":
        storageKey = "busBookings";
        setBuses((prev) => prev.filter((b) => b.name !== item.name));
        break;
      case "guide":
        storageKey = "guideBookings";
        setGuides((prev) => prev.filter((g) => g.name !== item.name));
        break;
      default:
        return;
    }
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updated = stored.filter((b) => b.name !== item.name);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const renderSection = (items, type, color = "green") => {
    if (!items || items.length === 0)
      return <p className="text-gray-500 mb-8">No bookings in this section.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition bg-white flex flex-col relative"
          >
            <button
              onClick={() => removeBooking(item, type)}
              className="absolute top-3 right-3 p-2 rounded-full shadow bg-white hover:bg-gray-100 transition z-10"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>

            <img
              src={item.img}
              alt={item.name}
              className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              {item.price && (
                <p className={`text-${color}-700 font-bold text-sm mb-1`}>
                  {item.price}
                </p>
              )}
              {item.desc && <p className="text-gray-700 text-sm mb-3 flex-1">{item.desc}</p>}

              {type === "car" || type === "bus" ? (
                <p className="text-gray-600 text-xs mb-3">🕒 {item.timing}</p>
              ) : null}

              {item.route && <p className="text-gray-600 text-xs mb-3">🛣️ {item.route.join(" → ")}</p>}

              <button
                className={`bg-${color}-600 text-white px-4 py-2 rounded hover:bg-${color}-700 transition text-sm`}
              >
                {type === "product" ? "Buy Now" : "Booking Confirmed"}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-10 px-2 md:px-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Your Bookings & Orders
      </h1>

      <h2 className="text-2xl font-bold mb-4 text-green-700">Products</h2>
      {renderSection(products, "product", "green")}

      <h2 className="text-2xl font-bold mb-4 text-blue-700">Hotels</h2>
      {renderSection(hotels, "hotel", "blue")}

      <h2 className="text-2xl font-bold mb-4 text-purple-700">Cars</h2>
      {renderSection(cars, "car", "purple")}

      <h2 className="text-2xl font-bold mb-4 text-orange-700">Buses</h2>
      {renderSection(buses, "bus", "orange")}

      <h2 className="text-2xl font-bold mb-4 text-red-700">Guides</h2>
      {renderSection(guides, "guide", "red")}
    </div>
  );
}
