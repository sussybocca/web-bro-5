import React, { useState } from "react";

export default function WebBoe() {
  const [query, setQuery] = useState("");
  const searxInstance = "https://searx.tiekoetter.com/search?q="; // public Searx instance

  const handleSearch = () => {
    if (query) window.open(`${searxInstance}${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <div style={{ padding: 16, background: "#0b1220", color: "#e6eef6", height: "100%" }}>
      <h2>WebBoe Browser</h2>
      <input
        type="text"
        placeholder="Search the web..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "70%", padding: 8, borderRadius: 4, marginRight: 8 }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "8px 16px", borderRadius: 4, background: "#2d6cdf", color: "white" }}
      >
        Search
      </button>
      <p style={{ marginTop: 16 }}>Results will open in a new tab.</p>
    </div>
  );
}
