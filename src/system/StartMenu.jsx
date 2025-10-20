import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function StartMenu() {
  const { startOpen, toggleStart, openApp } = useSystemStore();

  if (!startOpen) return null;

  const apps = ["Explorer", "Settings", "Terminal", "Project Publisher"];

  return (
    <div className="start-menu">
      <h3 style={{ margin: 0, marginBottom: 8 }}>Start</h3>
      <div>
        {apps.map(a => (
          <div key={a} style={{ padding: "8px 6px", cursor: "pointer" }} onClick={() => { openApp(a); toggleStart(); }}>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
