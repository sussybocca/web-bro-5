import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Taskbar() {
  const { openApps, bringToFront, openApp } = useSystemStore();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "48px",
        background: "rgba(30,30,30,0.95)",
        borderTop: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        boxSizing: "border-box",
        zIndex: 9999,
      }}
    >
      {/* ---- Start Button ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={() => openApp("Web Bro OS Mini")} // opens your new mini OS
      >
        <img
          src="/icons/webbro.svg"
          alt="Start"
          style={{ width: 24, height: 24 }}
        />
        <span>Web Bro</span>
      </div>

      {/* ---- Taskbar Apps ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {openApps.map((app) => (
          <div
            key={app.id}
            onClick={() => bringToFront(app.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.08)",
              padding: "6px 10px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          >
            <img
              src={app.icon || "/icons/app.svg"}
              alt={app.name}
              style={{ width: 20, height: 20 }}
            />
            <span style={{ fontSize: 13 }}>{app.name}</span>
          </div>
        ))}
      </div>

      {/* ---- Clock ---- */}
      <div
        style={{
          color: "white",
          fontSize: 13,
          fontFamily: "monospace",
        }}
      >
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
