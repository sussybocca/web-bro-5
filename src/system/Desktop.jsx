// src/system/Desktop.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";
import AnimatedWallpaper from "./AnimatedWallpaper";

export default function Desktop() {
  const { openApp, desktopApps } = useSystemStore();

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
    <div className="desktop relative w-full h-full">
      {/* Animated wallpaper as background */}
      <AnimatedWallpaper />

      {/* Desktop icons on top of wallpaper */}
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 18,
          position: "relative",
          zIndex: 10 // ensures icons appear above wallpaper
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
    </div>
  );
}
