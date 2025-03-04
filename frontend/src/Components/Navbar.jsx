import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg py-4 px-8 flex justify-between items-center backdrop-blur-lg bg-opacity-80"
    >
      {/* Logo with a cool hover effect */}
      <motion.h1
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl font-extrabold text-white tracking-widest"
      >
        Dimensiona
      </motion.h1>

      {/* Nav Links with animated hover effects */}
      <div className="space-x-6">
        {["Home", "Upload"].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-block"
          >
            <Link
              to={item === "Home" ? "/" : "/upload"}
              className="text-white text-lg font-semibold tracking-wide transition duration-300 ease-in-out transform hover:text-gray-200 hover:underline"
            >
              {item}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
