import React from "react";
import { useSystemStore } from "../store/systemStore";

export default function Taskbar() {
  const { openApps, toggleStart, closeApp } = useSystemStore();

  return (
    <div className="taskbar">
      <button className="btn" onClick={toggleStart}>⊞</button>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 8 }}>
        {openApps.map(a => (
          <div key={a.id}>
            <button className="btn" onClick={() => {
              // simple behavior: bring to front by closing & reopening
              closeApp(a.id);
              setTimeout(() => { /* small delay to allow close then open */ }, 10);
            }}>{a.name}</button>
          </div>
        ))}
      </div>

      <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
        Web Bro OS
      </div>
    </div>
  );
}
