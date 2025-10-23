// src/system/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = ["🖱️", "✨", "🔥", "💻", "🌟"]; // Emojis for cursor

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickAnim, setClickAnim] = useState(false);
  const [scrollAnim, setScrollAnim] = useState(false);
  const [emoji, setEmoji] = useState("🖱️");

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Randomly change emoji every movement for fun
      if (Math.random() > 0.95) {
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      }
    };

    const handleClick = () => {
      setClickAnim(true);
      setTimeout(() => setClickAnim(false), 300);
      // Change emoji on click
      setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    };

    const handleScroll = () => {
      setScrollAnim(true);
      setTimeout(() => setScrollAnim(false), 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  // Movement animations
  const movementVariants = [
    { scale: 1, rotate: 0 },
    { scale: 1.2, rotate: -5 },
    { scale: 0.9, rotate: 5 },
    { scale: 1, rotate: 10 },
    { scale: 1, rotate: -10 },
  ];

  // Click animations
  const clickVariants = [
    { scale: 0.8, rotate: 0, backgroundColor: "#4ade80" },
    { scale: 1.2, rotate: 360, backgroundColor: "#facc15" },
    { scale: 1, rotate: 45, backgroundColor: "#f87171" },
    { scale: 1.3, rotate: -45, backgroundColor: "#38bdf8" },
    { scale: 0.9, rotate: 0, backgroundColor: "#a78bfa" },
  ];

  // Scroll animations
  const scrollVariants = [
    { scale: 1, rotate: 15 },
    { scale: 1.1, rotate: -15 },
    { scale: 0.95, rotate: 20 },
    { scale: 1, rotate: -20 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed pointer-events-none w-10 h-10 rounded-full z-50 flex items-center justify-center text-lg"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
        animate={
          clickAnim
            ? clickVariants[Math.floor(Math.random() * clickVariants.length)]
            : scrollAnim
            ? scrollVariants[Math.floor(Math.random() * scrollVariants.length)]
            : movementVariants[Math.floor(Math.random() * movementVariants.length)]
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {emoji}
      </motion.div>
    </AnimatePresence>
  );
}
