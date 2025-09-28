import React, { useState } from "react";
import bglogin from"../assets/backg.jpg";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bglogin})`, // ✅ Jungle background
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-green-200/20 hover:shadow-green-400/30 transition-all duration-500">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-emerald-300 to-teal-400 drop-shadow-lg mb-6">
          {isLogin ? "Welcome Back Explorer 🌿" : "Join the Adventure ✨"}
        </h1>

        <form className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-green-100 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border border-green-300/30 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/20 text-white placeholder-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-green-100 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-green-300/30 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/20 text-white placeholder-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-100 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-green-300/30 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/20 text-white placeholder-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 hover:from-teal-600 hover:to-green-400 transition-all duration-500 text-white font-bold py-2 rounded-lg text-lg shadow-lg hover:shadow-emerald-400/40 hover:scale-105"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-green-100 text-center mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-300 hover:text-green-200 font-semibold underline-offset-2 hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
