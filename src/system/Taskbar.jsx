// src/system/Taskbar.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";
import "../styles/global.css"; // make sure global.css is imported

export default function Taskbar() {
  const { openApps, bringToFront, openApp } = useSystemStore();

  return (
    <div className="taskbar">
      {/* ---- Start Button ---- */}
      <div className="start-button" onClick={() => openApp("Web Bro OS Mini")}>
        <img src="/icons/webbro.svg" alt="Start" />
        <span>Web Bro</span>
      </div>

      {/* ---- Taskbar Apps ---- */}
      <div className="taskbar-apps">
        {openApps.map((app) => (
          <div
            key={app.id}
            className="taskbar-icon"
            onClick={() => bringToFront(app.id)}
          >
            <img src={app.icon || "/icons/app.svg"} alt={app.name} />
            <span>{app.name}</span>
          </div>
        ))}
      </div>

      {/* ---- Clock ---- */}
      <div className="taskbar-clock">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
