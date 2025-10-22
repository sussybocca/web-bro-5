// src/system/Taskbar.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";
import Windows from "./Windows";
import Search from "./Search";

export default function Taskbar() {
  const { openApp } = useSystemStore();

  // Base pinned apps
  const pinnedApps = [
    { name: "Explorer", icon: "/icons/file.svg" },
    { name: "Terminal", icon: "/icons/terminal.svg" },
    { name: "Web Bro OS Mini", icon: "/icons/mini-os.svg" },
    { name: "WebBoe Browser", icon: "/icons/browser.svg" }
  ];

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
      <div style={{ display: "flex", gap: 6 }}>
        {pinnedApps.map(app => (
          <img
            key={app.name}
            src={app.icon}
            alt={app.name}
            style={{ width: 36, height: 36, cursor: "pointer" }}
            onClick={() => openApp(app.name)}
          />
        ))}
      </div>

      {/* Open windows */}
      <Windows />

      {/* Search bar */}
      <Search />
    </div>
  );
}
