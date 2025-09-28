// pages/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  if (bookings.length === 0) {
    return <p className="text-center mt-10 text-gray-600">No bookings yet.</p>;
  }

  return (
    <div className="py-10 px-4 md:px-8 min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm mb-6"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      <div className="grid gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="booking-card border rounded-lg p-4 flex gap-4 items-center shadow-md"
          >
            {/* Image */}
            <img
              src={
                b.item?.img || "/placeholder.png"
              } // fallback image
              alt={b.item?.name || "Booking"} // fallback name
              className="w-32 h-32 object-cover rounded"
            />

            {/* Booking Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{b.item?.name || "Unknown"}</h3>
              <p className="text-gray-600">Type: {b.type || "Unknown"}</p>

              {/* Specific details based on booking type */}
              {b.type === "Hotel" && (
                <div className="text-gray-700">
                  <p>Check-in: {b.checkInDate || "N/A"}</p>
                  <p>Check-out: {b.checkOutDate || "N/A"}</p>
                  <p>Rooms: {b.rooms || "N/A"}</p>
                  <p>Total: ₹{b.discountedPrice || b.totalCost}</p>
                </div>
              )}

              {b.type === "Car" && (
                <div className="text-gray-700">
                  <p>Seats: {b.item?.seats || "N/A"}</p>
                  <p>Total: ₹{b.discountedPrice || b.totalCost}</p>
                </div>
              )}

              {b.type === "Bus" && (
                <div className="text-gray-700">
                  <p>Seats booked: {b.seatsBooked || "N/A"}</p>
                  <p>Total: ₹{b.discountedPrice || b.totalCost}</p>
                </div>
              )}

              {b.type === "Guide" && (
                <div className="text-gray-700">
                  <p>Language: {b.item?.language || "N/A"}</p>
                  <p>Total: ₹{b.discountedPrice || b.totalCost}</p>
                </div>
              )}

              {/* User Details */}
              <div className="mt-2 text-gray-800">
                <p>Name: {b.userDetails?.name || "N/A"}</p>
                <p>Phone: {b.userDetails?.phone || "N/A"}</p>
                <p>Address: {b.userDetails?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
