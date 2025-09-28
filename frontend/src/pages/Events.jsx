
import React, { useState } from "react";
import { Calendar } from "lucide-react";

export default function Events() {
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const [active, setActive] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const events = [
    // ...events array unchanged...
    {
      name: "Sarhul Festival",
      date: "April 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Sarhul_festival.jpg",
      desc: "A vibrant tribal festival celebrating nature, marked with dance, music, and rituals under the sacred Sal tree.",
    },
    {
      name: "Karma Festival",
      date: "September 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Karma_dance.jpg",
      desc: "A tribal harvest festival with mesmerizing Karma dance and music, symbolizing prosperity and community bonding.",
    },
    {
      name: "Chhath Puja",
      date: "November 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Chhath_Puja_at_sunrise.jpg",
      desc: "One of the most spiritual festivals of Jharkhand, devoted to the Sun God, performed on riverbanks with great devotion.",
    },
    {
      name: "Makar Sankranti",
      date: "January 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Makar_Sankranti_Celebration.jpg",
      desc: "Harvest festival celebrated with kite flying, traditional sweets, and community gatherings.",
    },
    {
      name: "Holi",
      date: "March 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Holi_Celebration.jpg",
      desc: "Festival of colors with joyful celebrations, music, and dancing, marking the arrival of spring.",
    },
    {
      name: "Diwali",
      date: "October 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Diwali_Celebration.jpg",
      desc: "Festival of lights celebrated with lamps, fireworks, and sweets, symbolizing victory of light over darkness.",
    },
  ];

  // Only close the active box when clicking outside
  const handleOverlayClick = e => {
    if (e.target.classList.contains("blur-overlay")) {
      setFlipped(Array(6).fill(false));
      setActive(null);
      setShowCalendar(false);
    }
  };

  const handleFlip = idx => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : false)));
    setActive(idx);
    setShowCalendar(false);
  };

  const handleClose = idx => {
    setFlipped(f => f.map((v, i) => (i === idx ? false : v)));
    setActive(null);
    setShowCalendar(false);
  };

  return (
    <section className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-green-900 via-green-700 to-green-400">
      {/* Blur overlay when a card is active */}
      {active !== null && (
        <div
          className="blur-overlay fixed inset-0 bg-black/30 backdrop-blur-lg z-30 transition-all duration-300"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className="relative z-40 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-green-100 mb-4 neon-text animate-glow">Festivals & Events</h2>
        <p className="text-green-200 mb-12 text-lg md:text-xl animate-fade-in">Experience Jharkhand’s vibrant cultural and spiritual festivals</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <React.Fragment key={i}>
              {active === i ? (
                // Floating active box, not in grid
                <div
                  className={`flipbox-container active-flipbox animate-fade-in-up`}
                  style={{
                    zIndex: 50,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(1.15)",
                    boxShadow: "0 0 60px 10px #22c55e, 0 0 40px 10px #000",
                    transition: "all 0.4s cubic-bezier(.4,2,.3,.9)",
                    width: "340px",
                    height: "340px",
                    borderRadius: "2rem",
                    maxWidth: "95vw",
                    maxHeight: "95vh",
                  }}
                >
                  <div className={`flipbox ${flipped[i] ? "flipped" : ""}`}>
                    {/* Front Side */}
                    <div
                      className="flipbox-front rounded-2xl shadow-lg bg-white bg-opacity-10 backdrop-blur-md border-2 border-green-700 relative flex flex-col items-center justify-center cursor-pointer"
                      onClick={() => handleFlip(i)}
                    >
                      <img
                        src={event.img}
                        alt={event.name}
                        className="w-72 h-44 object-cover rounded-xl mb-2 scale-100 hover:scale-105 transition-transform duration-500"
                        style={{ maxWidth: "90vw", maxHeight: "30vh" }}
                      />
                      <span className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full blur-sm animate-sparkle opacity-20" />
                      <button
                        className="calendar-btn bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-white rounded-full p-2 shadow-lg hover:shadow-green-700/50 transition flex items-center gap-2 font-semibold"
                        onClick={e => {
                          e.stopPropagation();
                          setShowCalendar(true);
                        }}
                      >
                        <Calendar size={22} />
                        <span>Open Calendar</span>
                      </button>
                      <h3 className="text-base font-semibold mt-2 neon-text animate-glow">{event.name}</h3>
                      <p className="text-green-300 text-xs font-bold">{event.date}</p>
                    </div>
                    {/* Back Side */}
                    <div
                      className="flipbox-back rounded-2xl shadow-lg bg-green-900 bg-opacity-90 backdrop-blur-md border-2 border-green-700 flex flex-col items-center justify-center cursor-pointer p-4"
                      onClick={() => handleClose(i)}
                    >
                      <h3 className="text-base font-semibold mb-2 neon-text animate-glow">{event.name}</h3>
                      <p className="text-green-300 text-xs font-bold mb-2">{event.date}</p>
                      <p className="text-white text-xs">{event.desc}</p>
                      <span className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full blur-sm animate-sparkle opacity-15" />
                      <button
                        className="mt-3 px-4 py-1 bg-green-700 text-white rounded-full shadow hover:bg-green-800 transition"
                        onClick={e => {
                          e.stopPropagation();
                          handleClose(i);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  {/* Calendar Modal */}
                  {showCalendar && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
                      <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-green-700 relative calendar-modal" style={{ width: "100%", maxWidth: "400px" }}>
                        <button
                          className="absolute top-2 right-2 text-green-700 hover:text-green-900 font-bold text-lg"
                          onClick={() => setShowCalendar(false)}
                        >
                          ×
                        </button>
                        <h4 className="text-xl font-bold mb-4 text-green-700">{event.name} Calendar</h4>
                        {/* Simple beautiful calendar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-green-700">April 2025</span>
                            <span className="text-green-700">🌿</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-green-900 font-semibold text-xs">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            {[...Array(30)].map((_, idx) => (
                              <div
                                key={idx}
                                className={`py-2 rounded-lg ${idx === 6 ? "bg-green-400 text-white font-bold shadow" : "bg-green-100"}`}
                              >
                                {idx + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-green-700 text-sm">Festival Date: <span className="font-bold">{event.date}</span></p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Normal grid box
                active === null && (
                  <div
                    className={`flipbox-container animate-fade-in-up`}
                    style={{
                      animationDelay: `${i * 120}ms`,
                      animationDuration: "700ms",
                      animationFillMode: "both",
                      width: "220px",
                      height: "340px",
                      borderRadius: "2rem",
                    }}
                  >
                    <div className={`flipbox ${flipped[i] ? "flipped" : ""}`}>
                      {/* Front Side */}
                      <div
                        className="flipbox-front rounded-2xl shadow-lg bg-white bg-opacity-10 backdrop-blur-md border-2 border-green-700 relative flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => handleFlip(i)}
                      >
                        <img
                          src={event.img}
                          alt={event.name}
                          className="w-40 h-44 object-cover rounded-xl mb-2 scale-100 hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full blur-sm animate-sparkle opacity-20" />
                        <button
                          className="calendar-btn bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-white rounded-full p-2 shadow-lg hover:shadow-green-700/50 transition flex items-center gap-2 font-semibold"
                          onClick={e => {
                            e.stopPropagation();
                            setShowCalendar(true);
                          }}
                        >
                          <Calendar size={22} />
                          <span>Open Calendar</span>
                        </button>
                        <h3 className="text-base font-semibold mt-2 neon-text animate-glow">{event.name}</h3>
                        <p className="text-green-300 text-xs font-bold">{event.date}</p>
                      </div>
                      {/* Back Side */}
                      <div
                        className="flipbox-back rounded-2xl shadow-lg bg-green-900 bg-opacity-90 backdrop-blur-md border-2 border-green-700 flex flex-col items-center justify-center cursor-pointer p-4"
                        onClick={() => handleClose(i)}
                      >
                        <h3 className="text-base font-semibold mb-2 neon-text animate-glow">{event.name}</h3>
                        <p className="text-green-300 text-xs font-bold mb-2">{event.date}</p>
                        <p className="text-white text-xs">{event.desc}</p>
                        <span className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full blur-sm animate-sparkle opacity-15" />
                        <button
                          className="mt-3 px-4 py-1 bg-green-700 text-white rounded-full shadow hover:bg-green-800 transition"
                          onClick={e => {
                            e.stopPropagation();
                            handleClose(i);
                          }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          ))}
        </div>

        <button className="mt-12 px-8 py-3 bg-gradient-to-r from-green-900 via-green-700 to-green-400 text-white uppercase font-bold rounded-full shadow-lg hover:scale-110 hover:shadow-green-700/50 transition-all duration-300 animate-fade-in-up animate-glow"
          style={{
            animationDelay: `${events.length * 120}ms`,
            animationDuration: "700ms",
            animationFillMode: "both"
          }}
        >
          Learn More
        </button>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow:
            0 0 5px #006400,
            0 0 10px #006400,
            0 0 20px #228B22,
            0 0 40px #228B22;
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s;
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e; }
          50% { text-shadow: 0 0 20px #bbf7d0, 0 0 40px #bbf7d0; }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.15; transform: scale(1);}
          50% { opacity: 0.2; transform: scale(1.2);}
        }
        .animate-sparkle {
          animation: sparkle 1.5s infinite;
        }
        /* Flipbox styles */
        .flipbox-container {
          perspective: 900px;
          width: 220px;
          height: 340px;
          margin: auto;
          border-radius: 2rem;
          transition: z-index 0.4s;
        }
        .active-flipbox {
          width: 340px !important;
          height: 340px !important;
          border-radius: 2rem !important;
          box-shadow: 0 0 60px 10px #22c55e, 0 0 40px 10px #000 !important;
        }
        @media (max-width: 600px) {
          .flipbox-container,
          .active-flipbox {
            width: 95vw !important;
            height: 340px !important;
            min-width: 0 !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(1.05) !important;
          }
          .calendar-modal {
            min-width: 0 !important;
            max-width: 95vw !important;
          }
        }
        .flipbox {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(.4,2,.3,.9);
          transform-style: preserve-3d;
        }
        .flipbox.flipped {
          transform: rotateY(180deg);
        }
        .flipbox-front, .flipbox-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 2rem;
        }
        .flipbox-back {
          transform: rotateY(180deg);
        }
        .calendar-btn {
          min-width: 140px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 1rem;
          margin-bottom: 8px;
        }
        .calendar-modal {
          min-width: 340px;
          max-width: 400px;
        }
      `}</style>
    </section>
  );
}
