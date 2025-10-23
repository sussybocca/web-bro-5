// src/components/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor({ emoji = "🖱️" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`body, * { cursor: none !important; }`}</style>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          fontSize: 28,
          pointerEvents: "none",
          zIndex: 9999,
          display: isVisible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          x: position.x - 16, // center the emoji
          y: position.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {emoji}
      </motion.div>
    </>
  );
}
