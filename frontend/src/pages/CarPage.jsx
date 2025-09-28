// src/pages/CarPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/initCars";
import Reward from "./Reward";
import { QRCodeSVG } from "qrcode.react";

export default function CarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));

  const [showBooking, setShowBooking] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", address: "" });
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [appliedReward, setAppliedReward] = useState(0);
  const [fromLocation, setFromLocation] = useState(car?.route?.[0] || "");
  const [toLocation, setToLocation] = useState(car?.route?.[1] || "");

  if (!car) return <p className="text-center mt-10">Car not found.</p>;

  const totalCost = parseInt(car.price.replace(/\D/g, ""));
  const discountedPrice = Math.max(totalCost - appliedReward, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
          alert("Location shared successfully!");
        },
        () => alert("Unable to fetch location.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleBooking = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      alert("Please fill all your details.");
      return;
    }
    if (!bookingDate || !bookingTime) {
      alert("Please select booking date and time.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (paymentMethod === "Card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("Please fill all card details.");
      return;
    }
    if (!fromLocation || !toLocation) {
      alert("Please select both From and To locations.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      id: Date.now(),
      type: "Car",
      item: car,
      userDetails,
      bookingDate,
      bookingTime,
      userLocation,
      fromLocation,
      toLocation,
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

    alert(`Car booked successfully! You earned ₹${rewardAmount} as cashback reward.`);
    navigate("/bookings");
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <button onClick={() => navigate(-1)} className="text-green-700 font-semibold hover:underline mb-6">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img src={car.img} alt={car.name} className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md" />

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-green-700">{car.name}</h2>
          <p className="text-gray-700">{car.desc}</p>
          <p className="text-green-700 font-bold text-lg">Car Number: {car.number}</p>
          <p className="text-green-700 font-bold text-lg">Price: ₹{totalCost}</p>
          {appliedReward > 0 && (
            <p className="text-green-700 font-semibold">Discounted Price: ₹{discountedPrice}</p>
          )}
          <p className="text-gray-600">Seats: {car.seats}</p>

          <div className="flex items-center gap-4 mt-4">
            <img src={car.driver.img} alt={car.driver.name} className="w-24 h-24 rounded-full object-cover" />
            <div className="flex flex-col">
              <p className="text-gray-800 font-semibold">{car.driver.name}</p>
              <p className="text-gray-600">{car.driver.language}</p>
            </div>
          </div>

          <button
            onClick={() => setShowBooking(!showBooking)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-6 w-36"
          >
            Book Now
          </button>

          {showBooking && (
            <div className="mt-6 border p-4 rounded shadow-md space-y-4">
              <Reward applyReward={setAppliedReward} />

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

              <div className="flex gap-2">
                <div className="flex-1">
                  <label>From:</label>
                  <select
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {car?.route?.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label>To:</label>
                  <select
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {car?.route?.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label>Booking Date:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label>Booking Time:</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              <button
                onClick={shareLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Share My Location
              </button>

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
                  <QRCodeSVG value={`upi://pay?pa=dummy@upi&pn=Demo&am=${discountedPrice}`} size={180} />
                  <button
                    onClick={handleBooking}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    I have paid
                  </button>
                </div>
              )}

              {(paymentMethod === "Card" || paymentMethod === "COD") && (
                <button
                  onClick={handleBooking}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
