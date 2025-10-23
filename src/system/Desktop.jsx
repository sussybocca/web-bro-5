import React, { useEffect, useState } from "react";
import { useSystemStore } from "../store/systemStore";
import { motion } from "framer-motion";
// Import the global CSS
import "../styles/global.css";

export default function Desktop() {
  const { openApp, desktopApps, openApps, closeApp, wallpaper } = useSystemStore();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Track window size for app drag constraints
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const icons = [
    { name: "Explorer", emoji: "📁" },
    { name: "Settings", emoji: "⚙️" },
    { name: "Terminal", emoji: "💻" },
    { name: "Project Publisher", emoji: "📦" },
    { name: "Web Bro Web Store", emoji: "🛒" },
    { name: "WebBoe Browser", emoji: "🌐" },
    { name: "FireBox", emoji: "🔥" },
    { name: "Betas", emoji: "🧪" },
    ...desktopApps?.map((app) => ({ name: app.name, emoji: app.emoji || "📄" })) || []
  ];

  return (
    <div
      className="desktop relative w-full h-full"
      style={{
        background: wallpaper ? `url(${wallpaper}) center/cover no-repeat` : "#000"
      }}
    >
      {/* Desktop icons */}
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 18,
          position: "relative",
          zIndex: 10
        }}
      >
        {icons.map((it) => (
          <div
            key={it.name}
            className="desktop-icon cursor-pointer flex flex-col items-center"
            onDoubleClick={() => openApp(it.name)}
          >
            <div style={{ fontSize: 48 }}>{it.emoji}</div>
            <div style={{ marginTop: 6, fontSize: 13, textAlign: "center" }}>{it.name}</div>
          </div>
        ))}
      </div>

      {/* Open apps rendered on top */}
      {openApps.map((app) => (
        <motion.div
          key={app.id}
          drag
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            top: 0,
            right: windowSize.width - app.size.w,
            bottom: windowSize.height - app.size.h,
          }}
          className="window"
          style={{
            left: app.position.x,
            top: app.position.y,
            width: app.size.w,
            height: app.size.h,
            zIndex: app.zIndex || 20
          }}
        >
          <div className="titlebar">
            <span>{app.name}</span>
            <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
          </div>
          <div className="content">
            {app.component}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
