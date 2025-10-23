// src/system/LoadingScreen.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Simulate boot progress for ~60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5; // Adjust speed (0.5 * 200ms ~ 1 minute)
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Booting logo animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, type: "spring", stiffness: 100 }}
        className="text-4xl mb-6"
      >
        💻 Web Bro OS
      </motion.div>

      {/* Progress bar container */}
      <div className="w-3/4 bg-gray-800 rounded-full h-4 overflow-hidden mb-4">
        <motion.div
          className="bg-green-500 h-4"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Loading text with subtle animation */}
      <AnimatePresence>
        <motion.div
          key={progress}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono"
        >
          Booting system... {Math.floor(progress)}%
        </motion.div>
      </AnimatePresence>

      {/* Additional animated "OS boot messages" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, staggerChildren: 0.3 }}
        className="mt-6 text-xs font-mono text-gray-400 space-y-1"
      >
        <motion.div animate={{ x: [-10, 0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          Initializing kernel modules...
        </motion.div>
        <motion.div animate={{ x: [-10, 0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
          Mounting virtual drives...
        </motion.div>
        <motion.div animate={{ x: [-10, 0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          Loading system resources...
        </motion.div>
        <motion.div animate={{ x: [-10, 0, 10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>
          Starting user interface...
        </motion.div>
      </motion.div>
    </div>
  );
}
