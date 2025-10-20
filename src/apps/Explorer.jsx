import React, { useState, useEffect } from "react";

export default function Explorer() {
  // Basic drives with sample files
  const [drives, setDrives] = useState({
    C: ["Program Files", "Users", "Windows"],
    D: ["Documents", "Games", "Movies"],
  });
  const [currentDrive, setCurrentDrive] = useState("C");
  const [currentFolder, setCurrentFolder] = useState("");

  const files = drives[currentDrive];

  const openFolder = (folder) => {
    setCurrentFolder(folder);
  };

  const goBack = () => {
    setCurrentFolder("");
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-semibold mb-2">File Explorer</h2>

      <div className="mb-2">
        <label>Select Drive: </label>
        <select
          value={currentDrive}
          onChange={(e) => {
            setCurrentDrive(e.target.value);
            setCurrentFolder("");
          }}
          className="bg-gray-800 text-white p-1 rounded"
        >
          {Object.keys(drives).map((drive) => (
            <option key={drive} value={drive}>{drive}:</option>
          ))}
        </select>
      </div>

      {currentFolder && (
        <button onClick={goBack} className="mb-2 px-2 py-1 bg-gray-700 rounded">
          ⬅ Back
        </button>
      )}

      <ul>
        {files.map((file) => (
          <li
            key={file}
            onClick={() => openFolder(file)}
            className="cursor-pointer hover:bg-gray-700 p-1 rounded"
          >
            {file}
          </li>
        ))}
      </ul>

      {currentFolder && (
        <div className="mt-2 text-gray-400">Inside: {currentFolder}</div>
      )}
    </div>
  );
}
