// src/system/AnimatedWallpaper.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSprings, animated, to as interpolate } from "@react-spring";

export default function AnimatedWallpaper() {
  const particleCount = 30;
  const particles = useRef([...Array(particleCount)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 40,
    speed: 20 + Math.random() * 40,
    delay: Math.random() * 5
  }))).current;

  const [springs, api] = useSprings(particleCount, i => ({
    x: particles[i].x,
    y: particles[i].y,
    scale: 1,
    opacity: 0.15,
    config: { mass: 2, tension: 180, friction: 50 },
    loop: { reverse: true },
  }));

  // Animate particles with slight motion offsets
  useEffect(() => {
    api.start(i => ({
      x: particles[i].x + (Math.random() - 0.5) * 10,
      y: particles[i].y + (Math.random() - 0.5) * 10,
      scale: 0.8 + Math.random() * 0.4,
      delay: particles[i].delay,
      loop: { reverse: true },
    }));
  }, [api]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Animated gradient layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          filter: "blur(20px)",
        }}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 90, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: "linear-gradient(225deg, #ff4e50, #f9d423)",
          mixBlendMode: "overlay",
          filter: "blur(30px)",
        }}
        animate={{ rotate: [0, -10, 0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 120, ease: "easeInOut" }}
      />

      {/* Spring-driven floating particles */}
      {springs.map((props, i) => (
        <animated.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: particles[i].size,
            height: particles[i].size,
            top: "0%",
            left: "0%",
            opacity: props.opacity,
            filter: "blur(3px)",
            transform: interpolate(
              [props.x, props.y, props.scale],
              (x, y, s) => `translate(${x}vw, ${y}vh) scale(${s})`
            ),
          }}
        />
      ))}

      {/* Radial wave overlays for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 70%)",
        }}
        animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 60, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05), transparent 70%)",
        }}
        animate={{ rotate: [0, -15, 0, 15, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 90, ease: "easeInOut" }}
      />
    </div>
  );
}
