// pages/BusPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buses } from "../data/initBuses";
import Reward from "./Reward";
import { QRCodeSVG } from "qrcode.react";

export default function BusPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bus = buses.find((b) => b.id === parseInt(id));

  const [showBooking, setShowBooking] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [appliedReward, setAppliedReward] = useState(0);

  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (!bus) return;
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const busBookings = bookings.filter(
      (b) => b.item?.id === bus.id && b.selectedSeats?.length
    );
    const seats = busBookings.flatMap((b) => b.selectedSeats);
    setBookedSeats(seats);
  }, [bus]);

  if (!bus) {
    return <p className="text-center text-red-500 mt-10">Bus not found!</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const applyReward = (amount) => setAppliedReward(amount);

  const calculatePrice = () => {
    if (!fromStop || !toStop || selectedSeats.length === 0) return 0;
    const startIndex = bus.route.indexOf(fromStop);
    const endIndex = bus.route.indexOf(toStop);
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) return 0;
    const totalStops = bus.route.length - 1;
    const distanceStops = endIndex - startIndex;
    const basePrice = parseInt(bus.price.replace(/\D/g, ""));
    const perStopCost = basePrice / totalStops;
    return Math.round(perStopCost * distanceStops * selectedSeats.length);
  };

  const handleBooking = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      alert("Please fill all your details.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!fromStop || !toStop || selectedSeats.length === 0) {
      alert("Please select boarding, destination, and seats.");
      return;
    }
    if (paymentMethod === "Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill all card details.");
        return;
      }
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const totalCost = calculatePrice();

    const newBooking = {
      id: Date.now(),
      type: "Bus",
      item: bus,
      userDetails: userDetails || {},
      totalCost,
      rewardUsed: appliedReward || 0,
      discountedPrice: totalCost - (appliedReward || 0),
      paymentMethod: paymentMethod || "Cash",
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      fromStop,
      toStop,
      selectedSeats,
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
    const rewardAmount = Math.round((totalCost * cashbackPercent) / 100);
    const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
    const newReward = { id: Date.now(), amount: rewardAmount, used: false };
    localStorage.setItem("rewards", JSON.stringify([...rewards, newReward]));

    alert(`Bus booked successfully! You earned ₹${rewardAmount} as cashback reward.`);
    navigate("/bookings");
  };

  const openRouteInGoogleMaps = () => {
    if (!bus.coordinates || bus.coordinates.length < 2) return;
    const origin = `${bus.coordinates[0].lat},${bus.coordinates[0].lng}`;
    const destination = `${bus.coordinates[bus.coordinates.length - 1].lat},${bus.coordinates[bus.coordinates.length - 1].lng}`;
    const waypoints = bus.coordinates.slice(1, -1).map(c => `${c.lat},${c.lng}`).join("|");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
    window.open(url, "_blank");
  };

  const SeatMap = ({ bus, selectedSeats, setSelectedSeats, bookedSeats }) => {
    const seatsPerRow = 4; // 2 left, 2 right
    const rows = Math.ceil(bus.capacity / seatsPerRow);

    const toggleSeat = (seatNumber) => {
      if (bookedSeats.includes(seatNumber)) return;
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    };

    return (
      <div className="mt-4 space-y-2">
        {[...Array(rows)].map((_, rowIndex) => {
          const seatNumbers = [
            rowIndex * seatsPerRow + 1,
            rowIndex * seatsPerRow + 2,
            rowIndex * seatsPerRow + 3,
            rowIndex * seatsPerRow + 4,
          ].filter((n) => n <= bus.capacity);

          return (
            <div key={rowIndex} className="flex justify-center gap-6">
              <div className="flex gap-2">
                {seatNumbers.slice(0, 2).map((num, i) => (
                  <button
                    key={num}
                    onClick={() => toggleSeat(num)}
                    disabled={bookedSeats.includes(num)}
                    className={`w-10 h-10 rounded-md text-sm font-bold
                      ${bookedSeats.includes(num) ? "bg-gray-400 cursor-not-allowed" :
                      selectedSeats.includes(num) ? "bg-green-500 text-white" : "bg-blue-200"}
                      ${i === 0 ? "border-2 border-yellow-500" : ""}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {seatNumbers.slice(2, 4).map((num, i) => (
                  <button
                    key={num}
                    onClick={() => toggleSeat(num)}
                    disabled={bookedSeats.includes(num)}
                    className={`w-10 h-10 rounded-md text-sm font-bold
                      ${bookedSeats.includes(num) ? "bg-gray-400 cursor-not-allowed" :
                      selectedSeats.includes(num) ? "bg-green-500 text-white" : "bg-blue-200"}
                      ${i === 1 ? "border-2 border-yellow-500" : ""}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <p className="text-xs text-gray-600 mt-2">
          🟦 Available | 🟩 Selected | ⬛ Booked | 🟨 Window seat
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="text-green-700 font-semibold hover:underline mb-6"
      >
        ← Back
      </button>

      <div className="mb-6 flex justify-center">
        <img
          src={bus.img}
          alt={bus.name}
          className="w-full max-w-md rounded-lg shadow-lg object-cover"
        />
      </div>

      <h2 className="text-3xl font-bold text-green-700 mb-2">{bus.name}</h2>
      <p className="text-gray-700 mb-2">{bus.desc}</p>
      <p className="text-green-700 font-bold mb-2">{bus.price}</p>
      <p className="text-gray-600 mb-1">Capacity: {bus.capacity}</p>
      <p className="text-gray-600 mb-1">
        Route: {bus.route.join(" → ")}
        <button
          onClick={openRouteInGoogleMaps}
          className="ml-4 text-blue-600 hover:underline text-sm"
        >
          View on Map
        </button>
      </p>
      <p className="text-gray-600 mb-1">Departure: {bus.departureTime}</p>
      <p className="text-gray-600 mb-4">Arrival: {bus.arrivalTime}</p>

      {bus.driver && (
        <div className="flex items-center gap-4 mb-4">
          <img
            src={bus.driver.img}
            alt={bus.driver.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-800 font-semibold">{bus.driver.name}</p>
            <p className="text-gray-600">{bus.driver.language}</p>
          </div>
        </div>
      )}

      {bus.amenities && bus.amenities.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Amenities:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {bus.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

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

          {/* Boarding & Destination */}
          <div className="flex gap-4">
            <select
              value={fromStop}
              onChange={(e) => setFromStop(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            >
              <option value="">From</option>
              {bus.route.map((stop, i) => (
                <option key={i} value={stop}>{stop}</option>
              ))}
            </select>
            <select
              value={toStop}
              onChange={(e) => setToStop(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            >
              <option value="">To</option>
              {bus.route.map((stop, i) => (
                <option key={i} value={stop}>{stop}</option>
              ))}
            </select>
          </div>

          {/* Seat Selection */}
          <SeatMap
            bus={bus}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            bookedSeats={bookedSeats}
          />

          {/* Fare Summary */}
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold text-lg mb-2">Fare Summary</h3>
            <p>Base Fare: ₹{calculatePrice()}</p>
            {appliedReward > 0 ? (
              <p className="text-green-700 font-semibold">
                Discounted Fare: ₹{calculatePrice() - appliedReward} (Reward Applied: ₹{appliedReward})
              </p>
            ) : (
              <p className="font-semibold">Total Payable: ₹{calculatePrice()}</p>
            )}
          </div>

          {/* Payment Method */}
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
              <QRCodeSVG
                value={`upi://pay?pa=dummy@upi&pn=Demo&am=${calculatePrice()}`}
                size={180}
              />
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
  );
}
