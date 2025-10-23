import React from "react";
import AppSearch from "./AppSearch";
import { useSystemStore } from "../store/systemStore";

export default function StartMenu() {
  const { apps, startMenuOpen, toggleStartMenu } = useSystemStore();

  return (
    <div className="start-menu-container">
      <button className="start-button" onClick={toggleStartMenu}>
        🪟 Start
      </button>

      <div className={`start-menu ${startMenuOpen ? "active" : ""}`}>
        <AppSearch apps={apps} />
        <div className="app-list">
          {apps.map((app) => (
            <div key={app.id} className="start-menu-item">
              {app.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
