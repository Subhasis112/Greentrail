import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function VRScene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="green" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
