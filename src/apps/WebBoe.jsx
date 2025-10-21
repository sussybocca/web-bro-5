import React, { useState } from "react";

export default function WebBoe() {
  const [query, setQuery] = useState("");
  const [searchURL, setSearchURL] = useState("");

  const handleSearch = () => {
    if (!query) return;
    // Using a public Searx instance
    setSearchURL(`https://searx.tiekoetter.com/?q=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 12, background: "#0b1220", display: "flex", gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web..."
          style={{ flex: 1, padding: 6, borderRadius: 4 }}
        />
        <button onClick={handleSearch} style={{ padding: "6px 12px" }}>
          Search
        </button>
      </div>

      {searchURL ? (
        <iframe
          src={searchURL}
          title="WebBoe Search"
          style={{ flex: 1, border: "none", width: "100%" }}
        />
      ) : (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#9fb3d8" }}>
          Enter a query and press Search
        </div>
      )}
    </div>
  );
}
