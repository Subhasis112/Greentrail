import React from "react";
import VRScene from "../components/VRScene";
import VR360Viewer from "../components/VR360Viewer";

export default function Plan() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Explore Jharkhand in AR/VR 🌍
      </h1>

      <h2 className="text-xl font-semibold mb-2">3D AR Demo</h2>
      <VRScene />

      <h2 className="text-xl font-semibold mt-8 mb-2">360° VR View</h2>
      <VR360Viewer />
    </div>
  );
}
