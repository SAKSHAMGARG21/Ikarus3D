import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({ modelUrl, localModel }) => {
  // Use either local model from public folder or database URL
  const filePath = localModel ? `/models/${localModel}` : modelUrl;
  const { scene } = useGLTF(filePath);

  return (
    <div className="w-full h-[500px] rounded-lg   border border-gray-300 bg-blue">
      <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[2, 5, 2]} angle={0.3} intensity={1} castShadow />

        {/* Smooth Orbit Controls */}
        <OrbitControls enableDamping={true} dampingFactor={0.1} />

        {/* Render 3D Model */}
        <primitive object={scene} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
