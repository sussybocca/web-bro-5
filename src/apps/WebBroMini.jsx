import React, { useState } from "react";

export default function WebBroOSMini() {
  const [installedApps, setInstalledApps] = useState([]);
  
  // Preinstalled mini apps for demonstration
  const availableApps = [
    { name: "Mini Explorer", icon: "/icons/file.svg" },
    { name: "Mini Terminal", icon: "/icons/terminal.svg" },
    { name: "Mini Games", icon: "/icons/game.svg" },
  ];

  const installApp = (app) => {
    if (!installedApps.find(a => a.name === app.name)) {
      setInstalledApps([...installedApps, app]);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>Web Bro OS Mini</h2>
      
      <h3>Custom Mini App Store</h3>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        {availableApps.map((app) => (
          <div key={app.name} style={{ cursor: "pointer" }} onClick={() => installApp(app)}>
            <img src={app.icon} alt={app.name} width={50} height={50} />
            <div style={{ textAlign: "center" }}>{app.name}</div>
          </div>
        ))}
      </div>

      <h3>Installed Mini Apps</h3>
      {installedApps.length === 0 ? (
        <p>No apps installed.</p>
      ) : (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {installedApps.map((app) => (
            <div key={app.name}>
              <img src={app.icon} alt={app.name} width={50} height={50} />
              <div style={{ textAlign: "center" }}>{app.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
