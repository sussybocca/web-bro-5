import React, { useState } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Explorer({ folderContent, title }) {
  const { drives, createFolder, createFile, readFile, betas } = useSystemStore();
  const [currentPath, setCurrentPath] = useState([]); // Track folder stack
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  // Determine current folder content
  const getCurrentItems = () => {
    // If folderContent is passed (like Betas folder)
    if (folderContent) return folderContent;

    let items = drives[currentPath[0] || "C"] || [];

    for (let i = 1; i < currentPath.length; i++) {
      const folder = items.find((f) => f.type === "dir" && f.name === currentPath[i]);
      items = folder?.children || [];
    }

    // Include Betas folder on the root of C:
    if (currentPath.length === 0) {
      items = [{ type: "dir", name: "Betas", children: betas }, ...items];
    }

    return items;
  };

  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:");
    if (!name) return;

    if (currentPath.length === 0) {
      createFolder("C", name);
    } else {
      // Add nested folder
      const items = getCurrentItems();
      const folder = items.find((f) => f.type === "dir" && f.name === currentPath[currentPath.length - 1]);
      if (folder) {
        folder.children = folder.children || [];
        folder.children.push({ type: "dir", name });
      }
    }
  };

  const handleCreateFile = () => {
    const name = prompt("Enter file name:");
    if (!name) return;
    const content = prompt("Enter initial content:") || "";

    if (currentPath.length === 0) {
      createFile("C", name, content);
    } else {
      const items = getCurrentItems();
      const folder = items.find((f) => f.type === "dir" && f.name === currentPath[currentPath.length - 1]);
      if (folder) {
        folder.children = folder.children || [];
        folder.children.push({ type: "file", name, content });
      }
    }
  };

  const handleOpenItem = (item) => {
    if (item.type === "dir") {
      setCurrentPath([...currentPath, item.name]);
      setSelectedFile(null);
    } else if (item.type === "file") {
      setSelectedFile(item.name);
      setFileContent(item.content || readFile("C", item.name) || "");
    }
  };

  const handleBack = () => {
    if (currentPath.length > 0) setCurrentPath(currentPath.slice(0, -1));
    setSelectedFile(null);
  };

  return (
    <div className="text-white p-3 font-mono h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{title || "Explorer"}</h2>

      {currentPath.length > 0 && (
        <button className="btn mb-2" onClick={handleBack}>⬅ Back</button>
      )}

      <div className="mb-2 flex gap-2">
        <button className="btn" onClick={handleCreateFolder}>New Folder</button>
        <button className="btn" onClick={handleCreateFile}>New File</button>
      </div>

      <div className="mb-4 flex-1 overflow-y-auto">
        <ul className="ml-4">
          {getCurrentItems().map((item, i) => (
            <li
              key={i}
              className="cursor-pointer hover:text-green-400 mb-1"
              onDoubleClick={() => handleOpenItem(item)}
            >
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
