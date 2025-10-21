import React, { useEffect, useState } from "react";

export default function Betas() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub releases JSON
    fetch("https://api.github.com/repos/sussybocca/web-bro-5/releases")
      .then((res) => res.json())
      .then((data) => {
        setReleases(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch releases", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-white">Loading betas...</div>;

  return (
    <div className="p-4 text-white font-mono">
      <h2 className="text-xl font-semibold mb-4">Betas Folder</h2>
      {releases.length === 0 && <p>No releases found.</p>}
      <ul className="space-y-2">
        {releases.map((release) => (
          <li
            key={release.id}
            className="bg-[#0d1a2a] p-2 rounded flex justify-between items-center"
          >
            <span>{release.name || release.tag_name}</span>
            <a
              href={release.zipball_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs px-2 py-1"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
