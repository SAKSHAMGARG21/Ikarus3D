import { useState, useEffect } from "react";
import ModelViewer from "../Components/ModelViewer";
import { motion } from "framer-motion";
import axios from "axios";

import conf from "../conf/conf";
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
  // const localModels = [
  //   { name: "Air Jordan 1 Low", file: "Air Jordan 1 Low.glb", type: "local" },
  //   { name: "Jordan Hex Mule", file: "Jordan Hex Mule.glb", type: "local" },
  //   { name: "True Blue and Copper", file: "True Blue and Copper.glb", type: "local" },
  // ];

  // // Remote models (e.g., from Cloudinary)
  // const remoteModels = [
  //   {
  //     name: "Cloud Model",
  //     url: "https://res.cloudinary.com/dc0cje1fm/image/upload/v1741068903/Ikarus3d/fnjj7owkd7db01v72thb.glb",
  //     type: "remote",
  //   },
  // ];

  // State for MongoDB models
  const [dbModels, setDbModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch models from MongoDB
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(conf.bkurl+"/models");
        console.log(response);
        setDbModels(response.data.data);
      } catch (error) {
        console.error("Error fetching models from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white pt-24">
      {/* Background mesh effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,rgba(59,130,246,0)_70%)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          3D Model Viewer
        </h1>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
      </motion.div>

      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
        >
          {dbModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center overflow-hidden relative"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-5 rounded-xl"></div>

              <h2 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {model.title}
              </h2>

              <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-inner">
                <ModelViewer modelUrl={model.image3d} />
              </div>

              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium text-white cursor-pointer"
              >
                View Details
              </motion.div> */}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Floating particles effect */}
      <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
