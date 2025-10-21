import React, { useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function FireBox() {
  const { addDesktopApp } = useSystemStore();
  const [activeApp, setActiveApp] = useState(null);

  // Preinstalled apps
  const preinstalledApps = [
    {
      name: "FireBox Web",
      icon: "/icons/firebox.svg",
      description: "Play mini HTML5 games directly in FireBox Web.",
      iframeSrcs: [
        "https://itch.io/embed/game/993392", // Example mini-game 1
        "https://itch.io/embed/game/1053800", // Example mini-game 2
      ],
    },
    {
      name: "Notes",
      icon: "/icons/notes.svg",
      description: "A simple notes app preinstalled in FireBox.",
      component: () => (
        <textarea
          style={{ width: "100%", height: "100%", padding: 10, fontSize: 14 }}
          placeholder="Type your notes here..."
        />
      ),
    },
  ];

  const handleInstall = (app) => {
    addDesktopApp({
      name: app.name,
      icon: app.icon,
      component: app.component || (() => <div>{app.name} App</div>),
    });
    alert(`${app.name} installed to Desktop!`);
  };

  return (
    <div style={{ padding: 16, height: "100%", overflowY: "auto" }}>
      <h2 style={{ marginBottom: 16 }}>FireBox - Preinstalled Apps</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {preinstalledApps.map((app) => (
          <div
            key={app.name}
            style={{
              background: "#0d1a2a",
              borderRadius: 8,
              padding: 12,
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => setActiveApp(app)}
          >
            <img src={app.icon} alt={app.name} style={{ width: 64, height: 64 }} />
            <div style={{ marginTop: 8, fontWeight: "bold" }}>{app.name}</div>
            <div style={{ fontSize: 12, color: "#8feda4" }}>{app.description}</div>
          </div>
        ))}
      </div>

      {/* Active App Viewer */}
      {activeApp && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            background: "#05101a",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <h3>{activeApp.name}</h3>
            <button onClick={() => setActiveApp(null)}>Close</button>
          </div>

          {activeApp.iframeSrcs ? (
            activeApp.iframeSrcs.map((src, i) => (
              <iframe
                key={i}
                src={src}
                width="100%"
                height="500px"
                frameBorder="0"
                allowFullScreen
                style={{ marginBottom: 16 }}
              />
            ))
          ) : (
            <div style={{ height: 500 }}>{activeApp.component?.()}</div>
          )}

          <button
            style={{ marginTop: 12 }}
            onClick={() => handleInstall(activeApp)}
          >
            Install to Desktop
          </button>
        </div>
      )}
    </div>
  );
}
