import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Transport = () => {
  const navigate = useNavigate();

  // 🔹 Smart UTS redirection
  const handleTrainBooking = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.cris.utsmobile",
        "_blank"
      );
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open("https://apps.apple.com/in/app/uts/id1054482061", "_blank");
    } else {
      window.open("https://www.utsonmobile.indianrail.gov.in", "_blank");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔹 Header with Back (left) + Title (center) */}
      <div className="relative flex items-center justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          ⬅ Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Transport Booking
        </h1>
      </div>

      {/* 🔹 Grid for Transport Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🚗 Cars & Cabs */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-xl font-semibold mb-2">Cars & Cabs</h2>
            <p className="text-gray-600 mb-4">
              Book a car or cab for your local or outstation travel. 
              Choose from a variety of vehicles at affordable rates.
            </p>
          </div>
          <Link to="/Car">
            <button className="mt-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
              Book Now
            </button>
          </Link>
        </div>

        {/* 🚌 Bus */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-xl font-semibold mb-2">Bus</h2>
            <p className="text-gray-600 mb-4">
              Reserve your bus seats quickly and conveniently for both 
              short and long-distance travel.
            </p>
          </div>
          <Link to="/Bus">
            <button className="mt-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
              Book Now
            </button>
          </Link>
        </div>

        {/* 🚆 Train */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-xl font-semibold mb-2">Train</h2>
            <p className="text-gray-600 mb-4">
              Check availability and book train tickets for your 
              preferred destinations with ease.
            </p>
          </div>
          <button
            onClick={handleTrainBooking}
            className="mt-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transport;
