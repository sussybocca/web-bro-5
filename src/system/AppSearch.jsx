// src/system/AppSearch.jsx
import React, { useState } from "react";

export default function AppSearch({ apps }) {
  const [query, setQuery] = useState("");

  const filtered = apps.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search apps..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      {query && (
        <div className="search-results mt-2 max-h-48 overflow-y-auto">
          {filtered.map((app) => (
            <div key={app.id} className="p-2 hover:bg-gray-700 rounded">
              {app.name}
            </div>
          ))}
          {filtered.length === 0 && <div className="p-2 text-gray-400">No apps found</div>}
        </div>
      )}
    </div>
  );
}
