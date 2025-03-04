import { useState, useEffect } from "react";
import ModelViewer from "../Components/ModelViewer";
import { motion } from "framer-motion";

// Loading Spinner Component
const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full"
    />
  </div>
);

const Home = () => {
  // Local models stored in public/models/
  const localModels = [
    { name: "Air Jordan 1 Low", file: "Air Jordan 1 Low.glb", type: "local" },
    { name: "Jordan Hex Mule", file: "Jordan Hex Mule.glb", type: "local" },
    { name: "True Blue and Copper", file: "True Blue and Copper.glb", type: "local" },
  ];

  // Remote models (e.g., from Cloudinary)
  const remoteModels = [
    {
      name: "Cloud Model",
      url: "https://res.cloudinary.com/dc0cje1fm/image/upload/v1741068903/Ikarus3d/fnjj7owkd7db01v72thb.glb",
      type: "remote",
    },
  ];

  // State for MongoDB models
  const [dbModels, setDbModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch models from MongoDB
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/models");
        const data = await response.json();
        setDbModels(data);
      } catch (error) {
        console.error("Error fetching models from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  // Merge all models
  const allModels = [...localModels, ...remoteModels, ...dbModels];

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
      >
        3D Model Viewer
      </motion.h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl space-y-10">
          {allModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col items-center"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">{model.name}</h2>
              {model.type === "local" ? (
                <ModelViewer localModel={model.file} />
              ) : (
                <ModelViewer modelUrl={model.url} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
