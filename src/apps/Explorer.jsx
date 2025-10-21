import React, { useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Explorer() {
  const { drives, createFolder, createFile, readFile } = useSystemStore();
  const [currentDrive, setCurrentDrive] = useState("C");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) createFolder(currentDrive, name);
  };

  const handleCreateFile = () => {
    const name = prompt("Enter file name:");
    if (!name) return;
    const content = prompt("Enter initial content:");
    createFile(currentDrive, name, content || "");
  };

  const handleOpenFile = (name) => {
    const content = readFile(currentDrive, name);
    setSelectedFile(name);
    setFileContent(content || "");
  };

  return (
    <div className="text-white p-3 font-mono">
      <h2 className="text-xl font-semibold mb-2">Explorer</h2>

      <div className="mb-2">
        <label className="mr-2">Drive:</label>
        <select value={currentDrive} onChange={(e) => setCurrentDrive(e.target.value)}>
          {Object.keys(drives).map((d) => (
            <option key={d} value={d}>{d}:</option>
          ))}
        </select>
      </div>

      <div className="mb-2 flex gap-2">
        <button className="btn" onClick={handleCreateFolder}>New Folder</button>
        <button className="btn" onClick={handleCreateFile}>New File</button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Contents of {currentDrive}:</h3>
        <ul className="ml-4">
          {drives[currentDrive].map((item, i) => (
            <li key={i} className="cursor-pointer" onClick={() => item.type === "file" && handleOpenFile(item.name)}>
              {item.type === "dir" ? "📁 " : "📄 "}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedFile && (
        <div>
          <h3 className="font-semibold">Viewing file: {selectedFile}</h3>
          <pre className="bg-[#05101a] p-2 rounded">{fileContent}</pre>
        </div>
      )}
    </div>
  );
}
