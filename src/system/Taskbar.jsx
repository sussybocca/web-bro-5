// src/system/Taskbar.jsx
import React, { useState } from "react";
import { useSystemStore } from "../store/systemStore";
import Windows from "./Windows";
import Search from "./Search";

export default function Taskbar() {
  const { openApp, openApps, toggleMinimize, bringToFront } = useSystemStore();
  const [pinnedApps, setPinnedApps] = useState([
    { name: "Explorer", icon: "/icons/file.svg" },
    { name: "Terminal", icon: "/icons/terminal.svg" },
    { name: "Web Bro OS Mini", icon: "/icons/mini-os.svg" },
    { name: "WebBoe Browser", icon: "/icons/browser.svg" },
  ]);

  const togglePin = (appName, icon) => {
    if (pinnedApps.find((a) => a.name === appName)) {
      setPinnedApps(pinnedApps.filter((a) => a.name !== appName));
    } else {
      setPinnedApps([...pinnedApps, { name: appName, icon }]);
    }
  };

  const handleAppClick = (appName) => {
    const opened = openApps.find((a) => a.name === appName);
    if (opened) {
      toggleMinimize(opened.id);
    } else {
      openApp(appName);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#0a1624",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 12px",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      {/* Pinned apps */}
      <div style={{ display: "flex", gap: 6 }}>
        {pinnedApps.map((app) => (
          <img
            key={app.name}
            src={app.icon}
            alt={app.name}
            title={`Right-click to ${pinnedApps.find(a => a.name === app.name) ? "unpin" : "pin"}`}
            style={{
              width: 36,
              height: 36,
              cursor: "pointer",
              opacity: openApps.find((a) => a.name === app.name)?.minimized ? 0.5 : 1,
            }}
            onClick={() => handleAppClick(app.name)}
            onContextMenu={(e) => {
              e.preventDefault();
              togglePin(app.name, app.icon);
            }}
          />
        ))}
      </div>

      {/* Active Windows */}
      <Windows />

      {/* Search */}
      <Search />
    </div>
  );
}
