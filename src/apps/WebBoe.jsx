import React, { useState } from "react";

export default function WebBoe() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query) {
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      window.open(searchUrl, "_blank");
    }
  };

  return (
    <div style={{ padding: 16, background: "#0b1220", color: "#e6eef6", height: "100%" }}>
      <h2>WebBoe Browser</h2>
      <input
        type="text"
        placeholder="Search the web..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "70%",
          padding: 8,
          borderRadius: 4,
          marginRight: 8,
          background: "#1b1f2a",
          color: "#e6eef6",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          background: "#2d6cdf",
          color: "white",
        }}
      >
        Search
      </button>
    </div>
  );
}
