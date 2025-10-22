import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Desktop() {
  const { wallpaper, openApp, desktopApps } = useSystemStore();

  // Helper to auto-detect .png / .jpg / .png.jpg
  const resolveIcon = (base) => {
    const possible = [
      `/icons/${base}.svg`,
      `/icons/${base}.png`,
      `/icons/${base}.jpg`,
      `/icons/${base}.png.jpg`
    ];
    return possible.find((path) => path) || "/icons/default.png";
  };

  // Base system icons + all apps
  const icons = [
    { name: "Explorer", icon: resolveIcon("file") },
    { name: "Settings", icon: resolveIcon("settings") },
    { name: "Terminal", icon: resolveIcon("terminal") },
    { name: "Project Publisher", icon: resolveIcon("project") },
    { name: "Web Bro Web Store", icon: resolveIcon("store") },
    { name: "WebBoe Browser", icon: resolveIcon("browser") },
    { name: "FireBox", icon: resolveIcon("firebox") },
    { name: "Betas", icon: resolveIcon("betas-folder") },
    { name: "Web Bro OS Mini", icon: resolveIcon("webbro-mini") },
    // Dynamic desktop apps from FireBox / Store
    ...(desktopApps?.map((app) => ({
      name: app.name,
      icon: app.icon || resolveIcon(app.name.toLowerCase())
    })) || [])
  ];

  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 18
        }}
      >
        {icons.map((it) => (
          <div
            key={it.name}
            className="desktop-icon"
            onDoubleClick={() => openApp(it.name)}
          >
            <img
              src={it.icon}
              alt={it.name}
              onError={(e) => (e.target.src = "/icons/default.png")}
              style={{ width: 56, height: 56, borderRadius: 8 }}
            />
            <div style={{ marginTop: 6, fontSize: 13 }}>{it.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
