import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

const ModelViewer = ({ modelUrl, localModel }) => {
  // Use either local model from public folder or database URL
  const filePath = modelUrl;
  const { scene } = useGLTF(filePath);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once the model is loaded
    setLoading(false);
  }, [scene]);

  return (
    <div className="w-full h-[500px] rounded-lg border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg flex items-center justify-center">
      {loading ? (
        <div className="text-gray-500">Loading model...</div>
      ) : (
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
      )}
    </div>
  );
};

export default ModelViewer;