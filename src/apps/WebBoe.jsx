import React, { useState, useRef } from "react";

export default function WebBoe() {
  const [url, setUrl] = useState("https://www.google.com");
  const [currentUrl, setCurrentUrl] = useState(url);
  const iframeRef = useRef(null);

  const handleNavigate = () => {
    let formatted = url;
    if (!/^https?:\/\//i.test(url)) {
      formatted = "https://www.google.com/search?q=" + encodeURIComponent(url);
    }
    setCurrentUrl(formatted);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNavigate();
  };

  const reload = () => {
    if (iframeRef.current) iframeRef.current.src = currentUrl;
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", padding: 8, background: "#0d1a2a", alignItems: "center" }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL or search..."
          style={{ flex: 1, padding: 6, borderRadius: 4, border: "1px solid #333", marginRight: 8 }}
        />
        <button onClick={handleNavigate} style={{ marginRight: 4 }}>Go</button>
        <button onClick={reload}>Reload</button>
      </div>
      <iframe
        ref={iframeRef}
        src={currentUrl}
        style={{ flex: 1, border: "none" }}
        title="WebBoe Browser"
      />
    </div>
  );
}
