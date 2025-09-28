import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function ContactUs() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      id="contact-us"
      className="min-h-screen bg-[#0a614e] text-[#e1d0ba] font-serif p-10 md:p-16 lg:p-24 flex flex-col items-center relative"
    >
      {/* Background image in top-right corner */}
      <div className="absolute top-5 right-5 w-80 h-80 sm:w-[22rem] sm:h-[22rem] md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] pointer-events-none z-10">
        <img
          src="public/contbg-removebg-preview.png"
          alt="Decorative"
          className="w-full h-full object-contain mix-blend-darken"
        />
      </div>

      <h1
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-wide ${
          animate ? "animate-slide-down" : ""
        } text-[Limelight,cursive] z-20`}
      >
        Contact Us
      </h1>

      {/* Contact Form */}
      <div className="w-full max-w-4xl mt-12 px-4 sm:px-6 md:px-0 z-20">
        <form className="flex flex-col space-y-6">
          <div className="w-full sm:w-3/5 transition-transform duration-500 hover:scale-105">
            <label className="text-lg sm:text-xl font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-400 p-3 rounded-md bg-transparent text-[#5c234c]"
            />
          </div>

          <div className="w-full sm:w-3/5 transition-transform duration-500 hover:scale-105">
            <label className="text-lg sm:text-xl font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-400 p-3 rounded-md bg-transparent text-[#5c234c]"
            />
          </div>

          <label className="text-lg sm:text-xl font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            placeholder="Enter your message"
            className="w-full border border-gray-400 p-3 rounded-md bg-transparent text-[#5c234c] transition-transform duration-500 hover:scale-105"
          ></textarea>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-48 bg-green-600 text-yellow-400 font-semibold py-3 rounded-md transition mt-6 text-lg relative overflow-hidden before:absolute before:inset-0 before:bg-green-500 before:scale-0 before:transition-transform before:duration-500 before:origin-center hover:before:scale-100 before:blur-md hover:shadow-lg hover:shadow-green-500 hover:text-yellow-400 z-10"
            >
              <span className="relative z-20">Submit</span>
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-16 flex flex-col items-center space-y-8 px-4 sm:px-6 md:px-0 z-20">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="text-center transition-transform duration-500 hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-semibold">Email Us on:</h3>
            <p className="flex items-center gap-3 mt-3 text-lg text-[#5c234c] transition duration-500 hover:text-green-600">
              <FaEnvelope /> xyz@gmail.com
            </p>
          </div>
          <div className="text-center transition-transform duration-500 hover:scale-105">
            <h3 className="text-xl sm:text-2xl font-semibold">Contact Us on:</h3>
            <p className="flex items-center gap-3 mt-3 text-lg text-[#5c234c] transition duration-500 hover:text-green-600">
              <FaPhone /> +91-1234567890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
