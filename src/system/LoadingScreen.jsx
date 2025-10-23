import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const dots = [0, 1, 2];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
        color: "#9fb3d8",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: 20 }}>Booting Web Bro OS...</h1>
      
      <div style={{ display: "flex", gap: 8 }}>
        {dots.map((i) => (
          <motion.div
            key={i}
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#9fb3d8",
            }}
          />
        ))}
      </div>
    </div>
  );
}
