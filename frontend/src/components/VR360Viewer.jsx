import { useEffect } from "react";

export default function VR360Viewer({ image }) {
  useEffect(() => {}, []);

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-lg">
      <a-scene embedded>
        <a-sky src={image} rotation="0 -90 0"></a-sky>
      </a-scene>
    </div>
  );
}
