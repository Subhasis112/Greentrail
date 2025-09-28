// pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tribalProducts, paintingsProducts, handwovenProducts } from "../data/initProducts";
import { Heart } from "lucide-react";

export default function ProductPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Load wishlist and cart from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  // Determine product list based on category
  let productList = [];
  if (category === "tribal") productList = tribalProducts;
  else if (category === "paintings") productList = paintingsProducts;
  else if (category === "handwoven") productList = handwovenProducts;

  const product = productList.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  // Check if this product is in wishlist
  const isWishlisted = wishlist.some((w) => w.id === product.id && w.category === category);

  // Toggle Wishlist
  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id && w.category === category);
      const updated = exists
        ? prev.filter((w) => !(w.id === item.id && w.category === category))
        : [...prev, { ...item, category }];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  // Add product to cart
  const addToCart = () => {
    const exists = cart.find((c) => c.id === product.id && c.category === category);
    let updated;
    if (exists) {
      updated = cart.map((c) =>
        c.id === product.id && c.category === category
          ? { ...c, quantity: c.quantity + 1 }
          : c
      );
    } else {
      updated = [...cart, { ...product, category, quantity: 1 }];
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="py-10 px-4 md:px-8 min-h-screen bg-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

      <div className="mt-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <button
              onClick={() => toggleWishlist(product)}
              className="p-2 rounded-full shadow bg-white hover:bg-gray-100 transition"
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          <p className="text-green-700 font-semibold mb-2">₹{product.price}</p>
          <p className="mb-2">Rating: {product.rating} ⭐</p>
          <p className="mb-4">{product.desc}</p>

          {/* Extra Info */}
          {product.madeOf && <p className="mb-2"><strong>Made of:</strong> {product.madeOf}</p>}
          {product.dealer && <p className="mb-2"><strong>Dealer:</strong> {product.dealer}</p>}

          {/* Comments */}
          {product.comments && product.comments.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Comments from buyers:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.comments.map((c, index) => (
                  <li key={index}><strong>{c.user}:</strong> {c.comment}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={addToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
