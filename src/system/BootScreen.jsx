// src/components/BootScreen.jsx
import React, { useEffect, useState } from "react";
import { runBootSequence } from "node-windows-boot"; // Node.js module

export default function BootScreen({ onBootComplete }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const boot = runBootSequence();

    boot.on("log", (line) => {
      setLogs((prev) => [...prev, line]);
    });

    boot.on("done", () => {
      onBootComplete();
    });

    return () => boot.stop();
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono p-4 overflow-y-auto">
      {logs.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}
