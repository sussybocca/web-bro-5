// src/system/Desktop.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Desktop() {
  const { wallpaper, openApp, desktopApps } = useSystemStore();

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
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 18
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
