import React, { useState } from "react";
import AppSearch from "./AppSearch";
import { useSystemStore } from "../store/systemStore";

export default function StartMenu() {
  const [open, setOpen] = useState(false);
  // Access apps from the store
  const apps = useSystemStore((s) => s.desktopApps || []);

  return (
    <div className="start-menu-container">
      <button className="start-button" onClick={() => setOpen(!open)}>
        🪟 Start
      </button>

      {open && (
        <div className="start-menu">
          <AppSearch apps={apps} />
          <div className="app-list">
            {apps.map((app) => (
              <div key={app.name} className="start-menu-item">
                {app.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
