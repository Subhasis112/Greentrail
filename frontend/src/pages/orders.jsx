import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusStages = ["Order Confirmed", "Shipped", "Delivered"];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">You have not bought any products yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">Your Orders</h2>
        <button
          onClick={() => navigate("/")}
          className="text-green-700 font-semibold hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-green-700 text-sm mb-1">Order ID: {order.id}</h3>
              <p className="text-gray-700 text-sm mb-1">
                Items: {order.items.map((i) => i.name).join(", ")}
              </p>
              <p className="text-gray-700 text-sm">Total: ₹{order.totalPrice}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-green-700 mb-4">Order Details</h2>

            <p className="mb-2">
              <span className="font-semibold">Delivery Address:</span> {selectedOrder.userDetails.address}
            </p>

            <h3 className="font-semibold mb-2">Delivery Status</h3>
            <div className="flex items-center justify-between mb-4">
              {statusStages.map((stage, index) => {
                const currentStage = selectedOrder.statusIndex || 0;
                const isDone = index <= currentStage;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-6 h-6 rounded-full mb-1 ${
                        isDone ? "bg-green-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className={`text-xs text-center ${isDone ? "text-green-700" : "text-gray-500"}`}>
                      {stage}
                    </span>
                    {index < statusStages.length - 1 && (
                      <div
                        className={`flex-1 h-1 ${isDone ? "bg-green-600" : "bg-gray-300"} mt-2`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            <h3 className="font-semibold mb-2">Products</h3>
            <div className="max-h-64 overflow-y-auto grid grid-cols-2 gap-4 mb-4">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex flex-col items-center border p-2 rounded">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded mb-1" />
                  <p className="text-xs font-semibold text-center">{item.name}</p>
                  <p className="text-xs text-green-700">₹{item.price} × {item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Map showing delivery */}
            <h3 className="font-semibold mb-2">Delivery Map</h3>
            <div className="h-64 w-full">
              <MapContainer
                center={[28.6139, 77.209]} // Default center
                zoom={12}
                scrollWheelZoom={false}
                className="h-full w-full rounded"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* User location */}
                <Marker position={[28.6139, 77.209]}>
                  <Popup>User Delivery Address</Popup>
                </Marker>
                {/* Delivery boy location (simulate random nearby) */}
                <Marker position={[28.615, 77.215]}>
                  <Popup>Delivery Boy</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
