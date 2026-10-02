import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Home, FileQuestion } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-blue-200">
      <Navbar />
      
      <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-screen pb-20 pt-20">
        
        {/* Floating Icon */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="p-6 bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 mb-8"
        >
          <FileQuestion size={64} className="text-stone-300" strokeWidth={1.5} />
        </motion.div>

        {/* Main 404 Text - "Architectural" Style */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center relative"
        >
            <h1 className="text-[10rem] leading-none font-black text-stone-100 select-none tracking-tighter">
                404
            </h1>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                Page not found
            </h2>
        </motion.div>

        <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-500 font-medium max-w-md text-center mt-6 mb-12"
        >
            Oops! The page you're looking for doesn't exist or has been moved to a new address.
        </motion.p>

        {/* Tactile Home Button */}
        <Link to="/">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-xl shadow-stone-900/20 transition-all"
            data-testid="home-button"
          >
            <Home size={20} />
            Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;