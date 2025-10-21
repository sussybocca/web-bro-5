import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Desktop() {
  const { wallpaper, openApp, desktopApps } = useSystemStore();

  // Base system icons + dynamic desktop apps
  const icons = [
    { name: "Explorer", icon: "/icons/file.svg" },
    { name: "Settings", icon: "/icons/settings.svg" },
    { name: "Terminal", icon: "/icons/terminal.svg" },
    { name: "Project Publisher", icon: "/icons/project.svg" },
    { name: "Web Bro Web Store", icon: "/icons/store.svg" },
    { name: "WebBoe Browser", icon: "/icons/browser.svg" },
    { name: "Betas", icon: "/icons/betas-folder.svg" },
    // FireBox apps / user-installed apps
    ...desktopApps.map((app) => ({ name: app.name, icon: app.icon }))
  ];

  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 18 }}>
        {icons.map((it) => (
          <div
            key={it.name}
            className="desktop-icon"
            onDoubleClick={() => openApp(it.name)}
          >
            <img
              src={it.icon}
              alt={it.name}
              style={{ width: 56, height: 56, borderRadius: 8 }}
            />
            <div style={{ marginTop: 6, fontSize: 13 }}>{it.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

}
