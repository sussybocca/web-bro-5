// src/system/AnimatedWallpaper.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSprings, animated, to as interpolate, config } from "react-spring";
import { useSystemStore } from "../store/systemStore";

export default function AnimatedWallpaper() {
  const { openApp, desktopApps, wallpaper } = useSystemStore();
  const particleCount = 30;
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const particles = useRef(
    [...Array(particleCount)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      speed: 20 + Math.random() * 40,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
    }))
  ).current;

  const [springs, api] = useSprings(particleCount, i => ({
    x: particles[i].x,
    y: particles[i].y,
    scale: 1,
    rotate: particles[i].rotation,
    opacity: 0.15,
    config: { mass: 2, tension: 180, friction: 50 },
    loop: { reverse: true },
  }));

  // Animate particles with slight motion offsets + parallax based on mouse
  useEffect(() => {
    api.start(i => ({
      x: particles[i].x + (Math.random() - 0.5) * 10 + (mouse.x / 50),
      y: particles[i].y + (Math.random() - 0.5) * 10 + (mouse.y / 50),
      scale: 0.8 + Math.random() * 0.4,
      rotate: particles[i].rotation + (mouse.x + mouse.y) / 20,
      delay: particles[i].delay,
      loop: { reverse: true },
    }));
  }, [api, mouse]);

  // Track mouse position for parallax
  useEffect(() => {
    const handleMouseMove = e => {
      setMouse({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Desktop icons (including any user-added apps)
  const icons = [
    { name: "Explorer", emoji: "📁" },
    { name: "Settings", emoji: "⚙️" },
    { name: "Terminal", emoji: "💻" },
    { name: "Project Publisher", emoji: "📦" },
    { name: "Web Bro Web Store", emoji: "🛒" },
    { name: "WebBoe Browser", emoji: "🌐" },
    { name: "FireBox", emoji: "🔥" },
    { name: "Betas", emoji: "🧪" },
    ...desktopApps?.map(app => ({ name: app.name, emoji: app.emoji || "📄" })) || []
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base wallpaper (optional image) */}
      {wallpaper && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
      )}

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

      {/* Floating spring particles */}
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
              [props.x, props.y, props.scale, props.rotate],
              (x, y, s, r) => `translate(${x}vw, ${y}vh) scale(${s}) rotate(${r}deg)`
            ),
          }}
        />
      ))}

      {/* Radial wave overlays */}
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

      {/* Desktop icons on top of wallpaper and particles */}
      <div
        className="absolute top-6 left-6 grid gap-6 grid-cols-6"
        style={{ zIndex: 10 }}
      >
        {icons.map(icon => (
          <div
            key={icon.name}
            className="desktop-icon cursor-pointer flex flex-col items-center select-none"
            onDoubleClick={() => openApp(icon.name)}
          >
            <div style={{ fontSize: 48 }}>{icon.emoji}</div>
            <div style={{ marginTop: 6, fontSize: 13, textAlign: "center", color: "white" }}>
              {icon.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
