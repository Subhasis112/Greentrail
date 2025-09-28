import React, { useState, useEffect } from "react";

// Category suggestions
const suggestions = {
  Adventure: [
    { icon: "🌲", title: "Forest Trek", desc: "Explore Netarhat forests and hidden trails" },
    { icon: "💦", title: "Waterfalls", desc: "Visit Hundru & Dassam falls for breathtaking views" },
  ],
  Culture: [
    { icon: "🛕", title: "Temple Visits", desc: "Discover Baidhyanath Dham & Sun temple" },
    { icon: "🎶", title: "Festivals", desc: "Tribal dance, local fairs & cultural events" },
  ],
  Gastronomy: [
    { icon: "🍲", title: "Local Cuisine", desc: "Taste local Jharkhand dishes & delicacies" },
  ],
  Wellness: [
    { icon: "🔥", title: "Campfire Nights", desc: "Relax under starlit skies" },
  ],
};

export default function Weather({ language = "en" }) {
  const [activeTab, setActiveTab] = useState("Adventure");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: 23.3441, lon: 85.3096 }); // Ranchi default
  const YOUR_API_KEY = "9396056919b1cb3449b547a39ecd2cb7";
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&lang=${language}&appid=${YOUR_API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }, [location, language]);

  // Map OpenWeather icons to emojis
  const weatherIcon = (main) => {
    switch (main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Snow": return "❄️";
      case "Thunderstorm": return "⛈️";
      default: return "🌤️";
    }
  };

  return (
    <section className="experiences py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Weatherwise Suggestions</h2>
          <p className="text-gray-600">Activities and destinations tailored for your journey</p>
        </div>

        {/* Current Weather Card */}
        {weather && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-4 p-6 glass-effect rounded-2xl shadow-lg">
              <span className="text-4xl">{weatherIcon(weather.weather[0].main)}</span>
              <div>
                <h3 className="text-2xl font-semibold">{weather.name}</h3>
                <p className="text-lg">{weather.weather[0].description}</p>
                <p className="text-xl font-bold">{Math.round(weather.main.temp)}°C</p>
                <p>Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {Object.keys(suggestions).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
                activeTab === tab
                  ? "bg-red-500 text-white border-red-500 scale-105"
                  : "bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestions[activeTab].map((item, i) => (
            <div
              key={i}
              className="experience-item text-center p-8 bg-gray-100 rounded-2xl shadow transition transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="experience-icon w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center text-2xl text-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
