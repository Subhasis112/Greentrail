import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const markers = [
  { lat: 23.3441, lng: 85.3096, title: "Ranchi", type: "City" },
  { lat: 23.6547, lng: 85.4300, title: "Hotel Example", type: "Hotel" },
  { lat: 23.3510, lng: 85.3090, title: "Police Station", type: "Police" },
  { lat: 23.3480, lng: 85.3100, title: "Restaurant Example", type: "Restaurant" },
];

// Helper component to force Leaflet to resize
function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function Map() {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div
      className={`transition-all duration-500 ${
        fullScreen ? "fixed inset-0 z-50" : "w-full h-64"
      } rounded-2xl overflow-hidden`}
    >
      <MapContainer
        center={[23.3441, 85.3096]}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              {m.title} - {m.type}
            </Popup>
          </Marker>
        ))}
        <ResizeMap />
      </MapContainer>

      <button
        onClick={() => setFullScreen(!fullScreen)}
        className="absolute top-2 right-2 bg-white/80 text-black px-2 py-1 rounded z-50"
      >
        {fullScreen ? "Close Map" : "Expand Map"}
      </button>
    </div>
  );
}
