import React, { useMemo, useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Store() {
  const { openApp } = useSystemStore();
  const [category, setCategory] = useState("All");

  // Categories of apps
  const categories = ["All", "Utilities", "Social", "Video"];

  // Auto-generate apps
  const apps = useMemo(() => {
    const generated = [];
    const totalApps = 50; // Example: 50 apps generated
    for (let i = 1; i <= totalApps; i++) {
      const cat = ["Utilities", "Social", "Video"][i % 3];
      generated.push({
        id: i,
        name: `${cat} App ${i}`,
        category: cat,
        icon: `/icons/app-${(i % 8) + 1}.svg`, // Make sure these icons exist
        description: `This is ${cat} App ${i}, a fully functional auto-generated app.`,
      });
    }
    return category === "All" ? generated : generated.filter(a => a.category === category);
  }, [category]);

  return (
    <div style={{ padding: 16, color: "#fff", overflowY: "auto", height: "100%" }}>
      <h2 style={{ marginBottom: 12 }}>Web Bro Web Store</h2>

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: "6px 12px",
              backgroundColor: category === c ? "#8feda4" : "#05101a",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              color: category === c ? "#000" : "#fff",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Apps grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        {apps.map((app) => (
          <div
            key={app.id}
            style={{
              backgroundColor: "#05101a",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={app.icon}
              alt={app.name}
              style={{ width: 48, height: 48, marginBottom: 8 }}
            />
            <div style={{ fontSize: 12, marginBottom: 8 }}>{app.name}</div>
            <div style={{ fontSize: 10, marginBottom: 8, color: "#8feda4" }}>
              {app.category}
            </div>
            <button
              onClick={() => openApp(app.name)}
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                backgroundColor: "#8feda4",
                color: "#000",
                fontSize: 10,
              }}
            >
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
