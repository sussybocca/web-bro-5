import React, { useState, useEffect } from "react";
import { useSystemStore } from "../store/systemStore";

// Categories for auto-generated apps
const categories = ["Filter Apps", "Social Platform", "Videos"];

// Utility to generate random apps
const generateApps = (count = 100) => {
  const apps = [];
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    apps.push({
      id: Date.now() + i,
      name: `${category} App ${i + 1}`,
      category,
      description: `This is ${category} App ${i + 1}`,
    });
  }
  return apps;
};

export default function Store() {
  const { openApp } = useSystemStore();
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setApps(generateApps(150)); // auto-generate 150 apps
  }, []);

  const filteredApps = filter === "All" ? apps : apps.filter((a) => a.category === filter);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-3">Web Bro Web Store</h2>

      <div className="mb-3 flex gap-2">
        <button className="btn" onClick={() => setFilter("All")}>All</button>
        {categories.map((c) => (
          <button key={c} className="btn" onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-[#05101a] rounded p-2 cursor-pointer hover:bg-[#0b1a2f]" onClick={() => openApp(app.name)}>
            <div className="text-lg font-semibold">{app.name}</div>
            <div className="text-sm text-gray-400">{app.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
