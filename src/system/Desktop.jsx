import React, { useEffect, useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Desktop() {
  const { wallpaper, openApp, desktopApps } = useSystemStore();
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    // Base apps with emoji icons
    const baseIcons = [
      { name: "Explorer", icon: "📁" },
      { name: "Settings", icon: "⚙️" },
      { name: "Terminal", icon: "🖥️" },
      { name: "Project Publisher", icon: "📦" },
      { name: "Web Bro Web Store", icon: "🛒" },
      { name: "WebBoe Browser", icon: "🌐" },
      { name: "FireBox", icon: "🔥" },
      { name: "Betas", icon: "🧪" },
      { name: "Web Bro OS Mini", icon: "🖱️" },
    ];

    // Merge user-installed apps
    const dynamicIcons = desktopApps?.map((app) => ({
      name: app.name,
      icon: app.icon || "📄",
    })) || [];

    setIcons([...baseIcons, ...dynamicIcons]);
  }, [desktopApps]);

  return (
    <div
      className="desktop"
      style={{
        background: wallpaper ? `url(${wallpaper}) center/cover no-repeat` : "#0b1220",
      }}
    >
      <div className="desktop-icons-grid">
        {icons.map((it) => (
          <div
            key={it.name}
            className="desktop-icon"
            onDoubleClick={() => openApp(it.name)}
          >
            <div className="desktop-icon-emoji">{it.icon}</div>
            <div className="desktop-icon-label">{it.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
