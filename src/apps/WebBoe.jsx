import React, { useState } from "react";

export default function WebBoe() {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("https://search.menfino.org/");

  const handleSearch = (e) => {
    e.preventDefault();
    // If user enters a full URL starting with http, load directly
    if (query.startsWith("http://") || query.startsWith("https://")) {
      setUrl(query);
    } else {
      // Otherwise, use the search engine with the query
      setUrl(`https://search.menfino.org/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", padding: 8, background: "#0d1a2a" }}
      >
        <input
          type="text"
          placeholder="Search or enter URL..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #333",
            background: "#05101a",
            color: "#e6eef6",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 8,
            padding: "8px 16px",
            borderRadius: 4,
            background: "#1e2a44",
            color: "#e6eef6",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </form>

      <iframe
        src={url}
        title="WebBoe Browser"
        style={{ flex: 1, border: "none" }}
      />
    </div>
  );
}
