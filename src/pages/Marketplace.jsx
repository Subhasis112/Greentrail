
import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Marketplace() {
  const navigate = useNavigate();
  const items = [
    {
      name: "Tribal Handicrafts",
      img: "src/assets/tribal-handicrafts.jpg",
      desc: "Beautiful bamboo and wooden crafts made by tribal artisans.",
      link: "/tribal",
    },
    {
      name: "Paintings & Art",
      img: "src/assets/paintings&arts.jpg",
      desc: "Traditional brass and metal craft symbolizing Jharkhand’s cultural richness.",
      link: "/paintings",
    },
    {
      name: "Handwoven Textiles",
      img: "src/assets/Handwoven-textiles.jpg",
      desc: "Unique handwoven saris and fabrics showcasing tribal patterns.",
      link: "/handwoven",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <button
        onClick={() => navigate("/")}
        className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
      >
        ← Back
      </button>
      
      <style>
      {`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.6s;
        }
  `   }
      <button
        onClick={() => navigate("/")}
        className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
      >
        
      </button>
      <button
        onClick={() => navigate("/")}
        className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
      >
        Cart
      </button>
      <button
        onClick={() => navigate("/")}
        className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
      >
        Orders
      </button>
      <button
        onClick={() => navigate("/")}
        className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in"
      >
        Wishlist
      </button>
      
      
</style>
      <h2 className="text-3xl font-bold text-center mb-12">Local Marketplace</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <Link key={i} to={item.link}>
            <div className="rounded-xl overflow-hidden shadow-lg border hover:shadow-2xl transition cursor-pointer">
              <img src={item.img} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  <ShoppingBag className="mr-2 text-green-600" size={20} /> {item.name}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
                <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
