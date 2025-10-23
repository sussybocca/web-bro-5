import React, { useState } from "react";
import AppSearch from "./AppSearch";
import { useSystemStore } from "../store/systemStore";

export default function StartMenu() {
  const [open, setOpen] = useState(false);
  const apps = useSystemStore((s) => s.apps);
  const openApp = useSystemStore((s) => s.openApp);

  return (
    <div>
      <button
        className="start-button"
        onClick={() => setOpen(!open)}
      >
        🪟 Start
      </button>

      {open && (
        <div className="start-menu bg-gray-900 text-white p-4 w-64 rounded shadow-lg">
          <AppSearch apps={apps} />
          <div className="app-list mt-2">
            {apps.map((app) => (
              <div
                key={app.id}
                className="app-item hover:bg-gray-700 p-2 rounded cursor-pointer"
                onClick={() => openApp(app.name)}
              >
                {app.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
