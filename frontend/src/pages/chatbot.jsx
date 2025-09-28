import React, { useState, useEffect, useRef } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 Welcome to GreenTrail." },
    { text: "I can help you plan your trip, find hotels, or suggest eco-friendly activities." },
    { text: "Click one of the options below to get started." },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const suggestions = ["Plan Trip", "Find Hotels", "Eco Activities", "Events Info"];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `You clicked "${text}". I can help you with that! 😊` },
      ]);
    }, 500);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-green-50">
      {/* Chat Card */}
      <div className="w-full max-w-4xl h-4/5 flex flex-col rounded-3xl shadow-2xl border border-green-300 overflow-hidden bg-white">
        {/* Header with centered logo/title */}
        <div className="bg-green-700 text-white px-6 py-6 flex justify-center items-center text-4xl font-extrabold">
          GreenTrail
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-auto space-y-4 bg-green-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-green-100 text-gray-900 shadow-sm max-w-full break-words"
            >
              {msg.text}
            </div>
          ))}

          {/* Suggestions */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {suggestions.map((sugg, idx) => (
              <button
                key={idx}
                className="px-4 py-2 rounded-xl text-gray-900 bg-green-50 border border-green-200 hover:bg-green-100 transition"
                onClick={() => sendMessage(sugg)}
              >
                {sugg}
              </button>
            ))}
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-6 flex gap-4 border-t border-green-300 bg-green-50">
          <input
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button
            className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition text-lg font-semibold"
            onClick={() => sendMessage(input)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
