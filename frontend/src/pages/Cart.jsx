// pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // QR code for UPI
import ErrorBoundary from "../components/ErrorBoundary";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", address: "" });
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [appliedReward, setAppliedReward] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
    if (rewards.length > 0) {
      setAppliedReward(rewards[0].amount); // apply first available reward
    }

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 5);
    setDeliveryDate(defaultDate.toISOString().split("T")[0]);
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedPrice = appliedReward ? totalPrice - appliedReward : totalPrice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handlePayment = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      alert("Please fill all delivery details.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "UPI") {
      alert("Scan the QR code to pay and click 'I have paid' once done.");
      return;
    }

    completeOrder(paymentMethod);
  };

  const completeOrder = (method = paymentMethod) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      userDetails,
      deliveryDate,
      totalPrice,
      appliedReward,
      finalPrice: discountedPrice,
      paymentMethod: method,
    };
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // Generate new random reward (1.5% - 5%)
    const randomReward = Math.floor(totalPrice * (Math.random() * (5 - 1.5) / 100 + 0.015));

    // Save reward and remove applied reward from localStorage
    const rewards = JSON.parse(localStorage.getItem("rewards")) || [];
    localStorage.setItem(
      "rewards",
      JSON.stringify([...rewards.slice(1), { id: Date.now(), amount: randomReward }])
    );

    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    alert(`Order placed successfully! You earned ₹${randomReward} reward for your next purchase.`);
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="py-10 px-4 md:px-8 min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="py-10 px-4 md:px-8 min-h-screen bg-white">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm mb-6"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-green-700">Your Cart</h2>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-700">₹{item.price} × {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4 font-bold text-lg">
            Total: ₹{totalPrice}
          </div>
          {appliedReward > 0 && (
            <div className="text-right mt-2 font-semibold text-green-600">
              Reward Applied: ₹{appliedReward} | Discounted Total: ₹{discountedPrice}
            </div>
          )}
        </div>

        <div className="border p-6 rounded shadow-md space-y-4">
          <h3 className="text-xl font-semibold mb-2">Delivery Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userDetails.name}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={userDetails.address}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
          />
          <label className="block">
            Expected Delivery Date:
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:border-green-500"
            />
          </label>

          <h3 className="text-lg font-semibold">Select Payment Method</h3>
          <div className="flex gap-4 mb-4">
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

          {/* UPI QR Code */}
          {paymentMethod === "UPI" && (
            <div className="flex flex-col items-center">
              <p className="mb-2">Scan this QR to pay:</p>
              <QRCodeSVG value={`upi://pay?pa=dummy@upi&pn=Demo&am=${discountedPrice}`} size={180} />
              <button
                onClick={() => completeOrder("UPI")}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                I have paid
              </button>
            </div>
          )}

          {/* Card or COD Payment */}
          {(paymentMethod === "Card" || paymentMethod === "COD") && (
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
