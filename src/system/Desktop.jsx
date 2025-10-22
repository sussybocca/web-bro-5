import React, { useEffect, useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Desktop() {
  const { wallpaper, openApp, desktopApps } = useSystemStore();
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    // Load icons only once
    const baseIcons = [
      { name: "Explorer", icon: "/Icons/file.png.jpg" },
      { name: "Settings", icon: "/Icons/settings.png.jpg" },
      { name: "Terminal", icon: "/Icons/terminal.png.jpg" },
      { name: "Project Publisher", icon: "/Icons/project.png.jpg" },
      { name: "Web Bro Web Store", icon: "/Icons/store.png.jpg" },
      { name: "WebBoe Browser", icon: "/Icons/browser.png.jpg" },
      { name: "FireBox", icon: "/Icons/firebox.png.jpg" },
      { name: "Betas", icon: "/Icons/betas-folder.png.jpg" },
      { name: "Web Bro OS Mini", icon: "/Icons/mini.png.jpg" },
    ];

    // Merge with user-installed apps
    const dynamicIcons = desktopApps?.map((app) => ({
      name: app.name,
      icon: app.icon,
    })) || [];

    setIcons([...baseIcons, ...dynamicIcons]);
  }, [desktopApps]);

  return (
    <div
      className="desktop"
      style={{
        backgroundImage: `url(${wallpaper})`,
        transition: "background 0.3s ease",
      }}
    >
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 18,
        }}
      >
        {icons.map((it) => (
          <div
            key={it.name}
            className="desktop-icon"
            onDoubleClick={() => openApp(it.name)}
            style={{
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <img
              src={it.icon}
              alt={it.name}
              onError={(e) => (e.target.src = "/Icons/default.png.jpg")}
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
            />
            <div style={{ marginTop: 6, fontSize: 13 }}>{it.name}</div>
          </div>
        ))}
      </div>

      {/* Smooth fade-in animation */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
}
