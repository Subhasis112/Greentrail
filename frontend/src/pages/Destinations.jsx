import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icons for start and end points
const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  iconSize: [35, 35],
});
const endIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190422.png",
  iconSize: [35, 35],
});
const defaultIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 30],
});

// 11 destinations with details
const destinations = [
  {
    name: "Johna fall",
    img: "src/assets/jonha.jpg",
    description:
      "Johna fall is a beautiful waterfall located in Jharkhand. Surrounded by lush greenery, it’s perfect for trekking and photography.",
    history:
      "Historically, Johna fall was discovered by locals centuries ago and is considered a scenic landmark.",
    activities: "Trekking, photography, picnics.",
    lat: 23.345,
    lng: 80.345,
  },
  {
    name: "Chandil dam",
    img: "https://your-image-link.com/chandil.jpg",
    description: "Chandil Dam is a serene spot surrounded by hills and water bodies.",
    history: "Built in 1917, it played a major role in irrigation and local history.",
    activities: "Boating, fishing, nature walks.",
    lat: 22.6131,
    lng: 85.9517,
  },
  {
    name: "Baidyanath dham",
    img: "https://your-image-link.com/baidyanath.jpg",
    description:
      "Baidyanath Dham is one of the twelve Jyotirlingas and a major pilgrimage site.",
    history: "The temple dates back to the 7th century and is an important spiritual site.",
    activities: "Pilgrimage, attending rituals, exploring nearby markets.",
    lat: 24.4925,
    lng: 86.7,
  },
  {
    name: "Betla national park",
    img: "src/assets/belta.jpg",
    description:
      "Betla National Park is a wildlife sanctuary known for tigers, elephants, and rich flora.",
    history: "Established in 1986 to protect endangered species.",
    activities: "Safari, bird watching, photography.",
    lat: 23.87,
    lng: 84.18,
  },
  {
    name: "Terracotta temple",
    img: "https://your-image-link.com/terracotta.jpg",
    description: "Famous for its intricate terracotta sculptures and architecture.",
    history: "Built in the 17th century by local artisans.",
    activities: "Photography, guided tours.",
    lat: 24.4354,
    lng: 85.345,
  },
  {
    name: "Patratu valley",
    img: "https://your-image-link.com/patratu.jpg",
    description: "A scenic valley with winding roads, hills, and lush greenery.",
    history: "Once a royal hunting ground, now a popular tourist destination.",
    activities: "Trekking, sightseeing, photography.",
    lat: 23.345,
    lng: 87.4485,
  },
  {
    name: "Maa Chhinnamastika temple",
    img: "https://your-image-link.com/chhinnamastika.jpg",
    description:
      "A revered temple dedicated to Maa Chhinnamastika, known for spiritual energy.",
    history: "An important Shakti Peeth in India.",
    activities: "Pilgrimage, rituals.",
    lat: 23.345,
    lng: 85.345,
  },
  {
    name: "Ithkori",
    img: "https://your-image-link.com/ithkori.jpg",
    description: "Known for its religious significance and natural beauty.",
    history: "Historically, Ithkori was a hub of spiritual activity.",
    activities: "Trekking, meditation, photography.",
    lat: 24.29694,
    lng: 85.155,
  },
  {
    name: "Netarhat",
    img: "https://your-image-link.com/netarhat.jpg",
    description: "A hill station with mesmerizing sunrises and lush surroundings.",
    history: "Known as the 'Queen of Chotanagpur Hills'.",
    activities: "Hiking, sightseeing, camping.",
    lat: 23.4854,
    lng: 84.2648,
  },
  {
    name: "Parasnath temple",
    img: "https://your-image-link.com/parasnath.jpg",
    description: "A Jain pilgrimage center atop Parasnath hill.",
    history: "Ancient site of Jainism with temples and shrines.",
    activities: "Pilgrimage, trekking, photography.",
    lat: 23.9612,
    lng: 85.345,
  },
  {
    name: "Baidyanath dham 2",
    img: "https://your-image-link.com/baidyanath2.jpg",
    description: "Another perspective of the famous Baidyanath Dham.",
    history: "Part of the historic temple complex.",
    activities: "Explore temple, attend rituals.",
    lat: 23.345,
    lng: 86.132,
  },
];

export default function DestinationSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      className="py-12"
      style={{
        background: "linear-gradient(to bottom, #d0f0c0, #7bb661)", // jungle green gradient
        minHeight: "100vh",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-10">
          Explore Beautiful Destinations
        </h2>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {destinations.map((place, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group transition transform hover:scale-105 cursor-pointer"
              onClick={() => setSelected(place)}
            >
              <div className="w-full h-48 bg-white rounded-xl shadow-lg overflow-hidden relative">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-green-800 italic">
                {place.name}
              </p>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-12 w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[23.0, 85.5]}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Markers */}
            {destinations.map((place, idx) => (
              <Marker
                key={idx}
                position={[place.lat, place.lng]}
                icon={
                  idx === 0
                    ? startIcon
                    : idx === destinations.length - 1
                    ? endIcon
                    : defaultIcon
                }
                eventHandlers={{
                  click: () => setSelected(place),
                }}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.description}
                </Popup>
              </Marker>
            ))}

          
          </MapContainer>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-blend-saturation bg-opacity-70 flex justify-center items-center z-50 p-4">
          <img
          src="src/assets/greenback.jpg"
          alt="Eco Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
          <div className="bg-blend-saturation  rounded-xl p-6 max-w-4xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-red-500 font-bold text-2xl"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-amber-50 mb-4">
              {selected.name}
            </h2>
            <img
              src={selected.img}
              alt={selected.name}
              className="w-full h-96 object-cover rounded-xl mb-4 shadow-lg"
            />
            <div className="text-left text-amber-50">
              <p className="mb-2">
                <strong>Description:</strong> {selected.description}
              </p>
              <p className="mb-2">
                <strong>History:</strong> {selected.history}
              </p>
              <p className="mb-2">
                <strong>What to do:</strong> {selected.activities}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
