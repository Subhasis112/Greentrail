import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import bgvid from "../assets/jharkhand.mp4"

// Images for travel cards
const travelCards = [
  {
    title: "Hotels",
    desc: "Find comfortable hotels easily",
    img: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=60",
    link: "/hotels",
  },
  {
    title: "Guides",
    desc: "Book local guides for your journey",
    img: "https://images.unsplash.com/photo-1580584126965-1c8a9b524276?auto=format&fit=crop&w=800&q=60",
    link: "/guides",
  },
  {
    title: "Car Rentals",
    desc: "Rent cars to explore freely",
    img: "https://images.unsplash.com/photo-1601758123927-1b1b5b9f84a5?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Flights",
    desc: "Book flights quickly",
    img: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Trains",
    desc: "Reserve train tickets",
    img: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Bikes, Buses",
    desc: "Book bus tickets, rent bikes",
    img: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=800&q=60",
  },
];

export default function Home() {
  // scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealOnScroll = () => {
      revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Section 1 - Video Hero */}
     <div className="relative h-screen w-full">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src={bgvid}
    autoPlay
    loop
    muted
    playsInline
  ></video>

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
    <h1 className="text-5xl font-bold mb-6 scroll-reveal hero-title">
      Welcome to Jharkhand 🌿
    </h1>
    <p className="max-w-2xl text-lg mb-8 scroll-reveal hero-subtitle">
      Experience the natural beauty, waterfalls, forests, and rich culture
      of Jharkhand.
    </p>
    <Link
      to="/destinations"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
    >
      Explore More
    </Link>
  </div>
</div>


      {/* 🔹 New Section - Search (Where to go, Date, Month, Year) */}
      <section className="search-section bg-gradient-to-r from-green-800 via-green-900 to-cyan-950 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 scroll-reveal">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
              Plan Your Journey
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Day"
                min="1"
                max="31"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Month"
                min="1"
                max="12"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
              <input
                type="number"
                placeholder="Year"
                min="2025"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="md:col-span-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 2 - Travel & Stay */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-800 via-green-900 to-cyan-950 text-white py-12">
        <h2 className="text-3xl font-bold mb-10">Travel & Stay 🛶</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12">
          {travelCards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition hover:scale-105"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-64 object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-green-200 mt-1">{card.desc}</p>
                <div className="mt-4">
  {card.link ? (
                    <Link
                      to={card.link}
                      className="px-4 py-2 bg-green-500/80 text-white rounded-full hover:bg-green-600 transition"
                    >
                      Explore
                    </Link>
                  ) : (
                    <button className="px-4 py-2 bg-green-500/80 text-white rounded-full hover:bg-green-600 transition cursor-not-allowed">
                      Explore
                    </button>
  )}
</div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 - Weather Suggestions */}
      <section className="bg-gradient-to-br from-green-800 via-green-900 to-black text-white">
        <Weather />
      </section>
    </div>
  );
}
