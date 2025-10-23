// src/components/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor({ emoji = "🖱️" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.7 : 1, // shrink cursor on click
          rotate: isClicking ? 20 : 0, // optional rotation for fun
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {emoji}
      </motion.div>

      {/* Optional ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="ripple"
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: position.y - 16,
              left: position.x - 16,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.3)",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
