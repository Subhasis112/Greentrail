import React from "react";
import { useParams, Link } from "react-router-dom";

const destinationData = {
  netarhat: {
    name: "Netarhat",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Netarhat_sunset.jpg",
    info: "Netarhat, often called the Queen of Chotanagpur, is famous for mesmerizing sunrises and sunsets, forests, and scenic beauty.",
  },
  patratu: {
    name: "Patratu Valley",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/23/Patratu_Valley.jpg",
    info: "Patratu Valley is known for its breathtaking green landscapes, curvy roads, and panoramic views.",
  },
  betla: {
    name: "Betla National Park",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Betla_National_Park.jpg",
    info: "Betla National Park is home to elephants, tigers, leopards, and a rich variety of flora and fauna.",
  },
  hundru: {
    name: "Hundru Falls",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Hundru_Falls_Ranchi.jpg",
    info: "Hundru Falls is one of the highest waterfalls in Jharkhand, offering a spectacular view and a popular picnic spot.",
  },
  dassam: {
    name: "Dassam Falls",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Dassam_Falls.jpg",
    info: "Dassam Falls is a beautiful waterfall near Ranchi, known for its scenic beauty and tranquil surroundings.",
  },
  deoghar: {
    name: "Deoghar",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Baidyanath_Dham_Deoghar.jpg",
    info: "Deoghar is a major religious destination, famous for the Baidyanath Temple, one of the twelve Jyotirlingas.",
  },
  jonha: {
    name: "Jonha Falls",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jonha_Falls.jpg",
    info: "Jonha Falls, also known as Gautamdhara, is a serene waterfall surrounded by lush greenery, ideal for nature lovers.",
  },
};

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinationData[id];

  if (!destination) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Destination Not Found</h2>
        <Link to="/" className="text-green-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img
        src={destination.img}
        alt={destination.name}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
      <p className="text-lg text-gray-700 mb-6">{destination.info}</p>
      <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        ← Back to Home
      </Link>
    </div>
  );
}
