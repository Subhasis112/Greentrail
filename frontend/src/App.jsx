// src/App.jsx
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import Plan from "./pages/Plan";
import Tribal from "./pages/tribal";
import Paintings from "./pages/paintings";
import Handwoven from "./pages/handwoven";
import Hotels from "./pages/Hotels";
import GuidePage from "./pages/GuidePage";
import Guides from "./pages/Guides";
import Transport from "./pages/transports";
import Car from "./pages/Car";
import CarPage from "./pages/CarPage";
import Buses from "./pages/Bus";
import BusPage from "./pages/BusPage";
import Wishlist from "./pages/wishlist";
import BookingOrder from "./pages/booking_Order";
import ProductPage from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/orders";
import Reward from "./pages/Reward";
import Bookings from "./pages/Bookings";
import Map from "./pages/Map";
import Login from "./pages/Login";
import WeatherWidget from "./pages/Weather";
import HotelPage from "./pages/HotelPage";
import { AuthContext } from "./context/AuthContext";
import ChatBot from "./pages/chatbot";
import "./index.css";

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = ["Home", "Destinations", "Events", "Marketplace", "Plan Your Trip"];

  // ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-cyan-950 sticky top-0 z-50">
      <img 
      src="src/assets/logojh.jpg" 
      alt="Jharkhand Tourism Logo" 
      className="h-10 w-auto"
    />

        {/* Desktop Menu */}
        <div className="space-x-6 hidden md:flex text-white items-center">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
            >
              {item}
            </Link>
          ))}

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2 font-semibold">{user?.username}</span>
              <Link
                to="/Bookings"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Bookings
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-cyan-950 z-50 flex flex-col items-center justify-center px-6">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>

          <div className="mb-10">
            <img src="./logo2.png" alt="Logo" className="w-32 animate-pulse" />
          </div>

          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 hover:text-green-500 transition-all duration-300 animate-bounce"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </Link>
              </li>
            ))}

            {!token ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="text-xl font-semibold">{user?.username}</span>
                </li>
                <li>
                  <Link to="/Bookings" onClick={() => setIsOpen(false)}>Bookings</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/tribal" element={<Tribal />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/handwoven" element={<Handwoven />} />
          <Route path="/Guides" element={<Guides />} />
          <Route path="/GuidePage" element={<GuidePage />} />
          <Route path="/guide/:id" element={<GuidePage />} />
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/transports" element={<Transport />} />
          <Route path="/Bus" element={<Buses />} />
          <Route path="/BusPage" element={<BusPage />} />
          <Route path="/buses/:id" element={<BusPage />} />
          <Route path="/car" element={<Car />} />
          <Route path="/CarPage" element={<CarPage />} />
          <Route path="/car/:id" element={<CarPage />} />

          {/* Login/Signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/Bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

          {/* Other public pages */}
          <Route path="/booking-order" element={<BookingOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/Products" element={<ProductPage />} />
          <Route path="/Rewards" element={<Reward />} />
          <Route path="/map" element={<Map />} />
          <Route path="/product/:category/:id" element={<ProductPage />} />
          <Route path="/HotelPage" element={<HotelPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/Weather" element={<WeatherWidget />} />
          <Route path="/chatbot" element={<ChatBot />} /> {/* ✅ ChatBot route */}
        </Routes>
      </div>

      {/* Floating ChatBot button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-green-700 text-white px-5 py-4 rounded-full shadow-lg hover:bg-green-800 transition-colors"
          onClick={() => navigate("/chatbot")}
        >
          ChatBot
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Jharkhand Tourism | Prototype</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}