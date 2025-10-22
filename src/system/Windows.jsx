// src/system/Windows.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Windows() {
  const { openApps, bringToFront } = useSystemStore();

  if (!openApps.length) return null;

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {openApps.map(app => (
        <button
          key={app.id}
          onClick={() => bringToFront(app.id)}
          style={{
            padding: "4px 8px",
            background: "#1a2a3a",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          {app.name}
        </button>
      ))}
    </div>
  );
}
