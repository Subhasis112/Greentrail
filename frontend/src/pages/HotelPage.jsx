// pages/HotelPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "../data/initHotels";
import { QRCodeSVG } from "qrcode.react";
import ErrorBoundary from "../components/ErrorBoundary";
import Reward from "../pages/Reward";

export default function HotelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);

  // Booking states
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", address: "" });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [appliedReward, setAppliedReward] = useState(0);

  const hotel = hotels.find((h) => h.id === Number(id));
  if (!hotel) return <p className="text-center mt-10">Hotel not found.</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalCost = hotel.price.match(/\d+/)
    ? calculateNights() * parseInt(hotel.price.replace(/\D/g, ""))
    : 0;

  const applyReward = (amount) => setAppliedReward(Math.min(amount, totalCost));

  const handlePayment = () => {
    // Validate user details
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      alert("Please fill all your details.");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      alert("Please select start and end dates.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Payment method validation
    if (paymentMethod === "Card") {
      const cardRegex = /^\d{16}$/;
      const cvvRegex = /^\d{3}$/;
      if (!cardDetails.number || !cardRegex.test(cardDetails.number)) {
        alert("Enter a valid 16-digit card number.");
        return;
      }
      if (!cardDetails.expiry) {
        alert("Enter card expiry date.");
        return;
      }
      if (!cardDetails.cvv || !cvvRegex.test(cardDetails.cvv)) {
        alert("Enter a valid 3-digit CVV.");
        return;
      }
    }

    completeBooking();
  };

  const completeBooking = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      id: Date.now(),
      type: "Hotel",
      item: hotel,
      userDetails: userDetails,
      checkInDate,
      checkOutDate,
      totalCost,
      rewardUsed: appliedReward,
      discountedPrice: totalCost - appliedReward,
      paymentMethod,
    };
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));

    // Mark reward as used
    if (appliedReward > 0) {
      const savedRewards = JSON.parse(localStorage.getItem("rewards")) || [];
      const index = savedRewards.findIndex((r) => r.amount === appliedReward && !r.used);
      if (index > -1) {
        savedRewards[index].used = true;
        localStorage.setItem("rewards", JSON.stringify(savedRewards));
      }
    }

    // Generate cashback reward 1.5%-5%
    const cashbackPercent = Math.random() * (5 - 1.5) + 1.5;
    const rewardAmount = Math.round(((totalCost - appliedReward) * cashbackPercent) / 100);
    const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
    const newReward = { id: Date.now(), amount: rewardAmount, used: false };
    localStorage.setItem("rewards", JSON.stringify([...rewards, newReward]));

    alert(`Booking successful! You earned ₹${rewardAmount} as cashback reward.`);
    navigate("/bookings");
  };

  return (
    <ErrorBoundary>
      <div className="py-10 px-4 md:px-8 min-h-screen bg-white">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm mb-6"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <img src={hotel.img} alt={hotel.name} className="w-full md:w-1/2 h-auto object-cover rounded" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
            <p className="text-green-700 font-semibold mb-1">{hotel.price}</p>
            <p className="mb-1">Rating: {hotel.rating} ⭐</p>
            <p className="text-gray-700 mb-2">{hotel.desc}</p>
            <p className="text-gray-700 mb-2">Phone: {hotel.phone}</p>
            <p className="text-gray-700 mb-2">Address: {hotel.address}</p>

            {hotel.highlights && (
              <div className="mb-2">
                <h3 className="font-semibold">Highlights:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {hotel.highlights.map((h, idx) => (<li key={idx}>{h}</li>))}
                </ul>
              </div>
            )}
            {hotel.activities && (
              <div className="mb-2">
                <h3 className="font-semibold">Activities:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {hotel.activities.map((a, idx) => (<li key={idx}>{a}</li>))}
                </ul>
              </div>
            )}
            {hotel.amenities && (
              <div className="mb-2">
                <h3 className="font-semibold">Amenities:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {hotel.amenities.map((a, idx) => (<li key={idx}>{a}</li>))}
                </ul>
              </div>
            )}

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`,
                  "_blank"
                )
              }
              className="bg-blue-600 text-white px-4 py-2 mr-2 rounded hover:bg-blue-700 mt-2"
            >
              View Location
            </button>

            <button
              onClick={() => setShowBooking(!showBooking)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
            >
              Book Now
            </button>

            {showBooking && (
              <div className="mt-6 border p-4 rounded shadow-md space-y-4">
                <Reward applyReward={applyReward} />

                <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <p className="font-semibold">Total Cost: ₹{totalCost}</p>
                {appliedReward > 0 && (
                  <p className="font-semibold text-green-700">
                    Discounted Price after applying reward: ₹{totalCost - appliedReward}
                  </p>
                )}

                <h3 className="text-lg font-semibold">Select Payment Method</h3>
                <div className="flex gap-4 mb-2">
                  {["Card", "UPI", "COD"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`px-4 py-2 rounded ${
                        paymentMethod === method ? "bg-green-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      {method === "COD" ? "Cash on Delivery" : method}
                    </button>
                  ))}
                </div>

                {paymentMethod === "Card" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="number"
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        className="flex-1 border px-3 py-2 rounded"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className="flex-1 border px-3 py-2 rounded"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "UPI" && (
                  <div className="flex flex-col items-center">
                    <p className="mb-2">Scan this QR to pay:</p>
                    <QRCodeSVG value={`upi://pay?pa=dummy@upi&pn=Demo&am=${totalCost}`} size={180} />
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {paymentMethod === "UPI" ? "I have paid" : "Proceed to Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
