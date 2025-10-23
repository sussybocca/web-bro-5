// src/system/LoadingScreen.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootSteps = [
  "Initializing kernel...",
  "Loading system modules...",
  "Starting network services...",
  "Checking storage devices...",
  "Launching desktop environment...",
  "Web Bro OS ready!"
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < bootSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200); // change step every 1.2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white font-mono relative overflow-hidden">
      {/* Boot Logo */}
      <motion.div
        className="text-6xl mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🖥️
      </motion.div>

      {/* Boot Steps */}
      <div className="space-y-2 text-left w-80">
        {bootSteps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-400"
          >
            {step}
          </motion.div>
        ))}
      </div>

      {/* Loading Bar */}
      <div className="mt-8 w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / bootSteps.length) * 100}%` }}
          transition={{ type: "tween", duration: 1 }}
        />
      </div>

      {/* Flicker effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.02, 0] }}
        transition={{ repeat: Infinity, duration: 0.1, repeatType: "loop" }}
      />
    </div>
  );
}
