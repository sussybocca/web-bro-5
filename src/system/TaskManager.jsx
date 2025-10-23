// src/system/TaskManager.jsx
import React, { useEffect, useState } from "react";

export default function TaskManager() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses([
        { name: "Explorer.exe", cpu: Math.floor(Math.random() * 5) },
        { name: "Chrome.exe", cpu: Math.floor(Math.random() * 20) },
        { name: "WebBroOS.exe", cpu: Math.floor(Math.random() * 10) },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="task-manager p-4 bg-gray-800 text-white rounded shadow-lg w-96">
      <h2 className="font-bold mb-2">Task Manager</h2>
      {processes.map((p, i) => (
        <div key={i} className="flex justify-between mb-1">
          <span>{p.name}</span>
          <span>{p.cpu}% CPU</span>
        </div>
      ))}
    </div>
  );
}
