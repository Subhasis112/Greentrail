// src/pages/GuidePage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { guides } from "../data/initGuides";
import { QRCodeSVG } from "qrcode.react";
import Reward from "../pages/Reward";

export default function GuidePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find((g) => g.id === Number(id));

  const [showBooking, setShowBooking] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [appliedReward, setAppliedReward] = useState(0);

  if (!guide) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Guide Not Found</h2>
        <button
          onClick={() => navigate("/guides")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Guides
        </button>
      </div>
    );
  }

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut) - new Date(checkIn);
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 1;
  };

  const pricePerDay = parseInt(guide.pricePerDay.replace(/\D/g, ""));
  const totalCost = pricePerDay * calculateDays();
  const discountedPrice = Math.max(totalCost - appliedReward, 0);

  const handlePayment = () => {
    if (!checkIn || !checkOut) return alert("Please select booking dates.");
    if (!phone) return alert("Please enter your phone number.");
    if (!paymentMethod) return alert("Please select a payment method.");
    if (paymentMethod === "Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        return alert("Please fill all card details.");
      }
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      id: Date.now(),
      type: "Guide",
      item: guide,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      userDetails: { name: phone, phone, address: "" },
      totalCost,
      discountedPrice,
      rewardUsed: appliedReward,
      paymentMethod,
      cardDetails: paymentMethod === "Card" ? cardDetails : null,
    };
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));

    // Mark applied reward as used
    if (appliedReward > 0) {
      const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
      const index = rewards.findIndex((r) => r.amount === appliedReward && !r.used);
      if (index > -1) {
        rewards[index].used = true;
        localStorage.setItem("rewards", JSON.stringify(rewards));
      }
    }

    // Generate cashback reward 1.5%-5%
    const cashbackPercent = Math.random() * (5 - 1.5) + 1.5;
    const rewardAmount = Math.round((totalCost * cashbackPercent) / 100);
    const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
    localStorage.setItem(
      "rewards",
      JSON.stringify([...rewards, { id: Date.now(), amount: rewardAmount, used: false }])
    );

    alert(`Booking successful! You earned ₹${rewardAmount} as cashback reward.`);
    navigate("/bookings");
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <button onClick={() => navigate("/guides")} className="text-green-700 font-semibold hover:underline mb-6">
        ← Back to Guides
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={guide.img} alt={guide.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2 text-green-700">{guide.name}</h2>
          <p className="text-gray-700 mb-4">{guide.desc}</p>
          <p className="text-gray-600 mb-1"><strong>Rating:</strong> ⭐ {guide.rating}</p>
          <p className="text-gray-600 mb-1"><strong>Phone:</strong> {guide.phone}</p>
          <p className="text-gray-600 mb-1"><strong>Languages:</strong> {guide.languages.join(", ")}</p>
          <p className="text-gray-600 mb-1"><strong>Specialties:</strong> {guide.specialties.join(", ")}</p>
          <p className="text-gray-600 mb-4"><strong>Availability:</strong> {guide.availability}</p>
          <p className="text-green-700 font-bold text-lg mb-4">Price per Day: {guide.pricePerDay}</p>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowBooking(!showBooking)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Book Now
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(guide.location || "")}`,
                  "_blank"
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Location
            </button>
          </div>

          {showBooking && (
            <div className="border p-6 rounded shadow-md space-y-4">
              {/* Reward selection */}
              <Reward applyReward={setAppliedReward} />

              <h3 className="text-xl font-semibold mb-2">Booking Details</h3>

              <label className="block">
                Booking From:
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:border-green-500"
                />
              </label>

              <label className="block">
                Booking To:
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:border-green-500"
                />
              </label>

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
              />

              {appliedReward > 0 && (
                <p className="text-green-600 font-semibold">
                  Applied Reward: ₹{appliedReward} | Discounted Price: ₹{discountedPrice}
                </p>
              )}

              <h3 className="text-lg font-semibold">Select Payment Method</h3>
              <div className="flex gap-4 mb-4">
                {["Card", "UPI"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-4 py-2 rounded ${paymentMethod === method ? "bg-green-600 text-white" : "bg-gray-200"}`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {paymentMethod === "Card" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-1/2 border px-3 py-2 rounded focus:outline-none focus:border-green-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-1/2 border px-3 py-2 rounded focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div className="flex flex-col items-center">
                  <p className="mb-2">Scan this QR to pay:</p>
                  <QRCodeSVG value={`upi://pay?pa=dummy@upi&pn=Demo&am=${discountedPrice}`} size={180} />
                  <button
                    onClick={handlePayment}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    I have paid
                  </button>
                </div>
              )}

              <p className="mt-2 font-semibold">Total Cost: ₹{totalCost}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
