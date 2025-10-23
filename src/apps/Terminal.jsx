// src/system/Terminal.jsx
import React, { useState } from "react";

export default function Terminal() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");

  const handleCommand = (cmd) => {
    setLogs((prev) => [...prev, `> ${cmd}`]);
    if (cmd === "help") {
      setLogs((prev) => [...prev, "Available commands: help, echo, clear"]);
    } else if (cmd.startsWith("echo ")) {
      setLogs((prev) => [...prev, cmd.slice(5)]);
    } else if (cmd === "clear") {
      setLogs([]);
    } else {
      setLogs((prev) => [...prev, `Unknown command: ${cmd}`]);
    }
    setInput("");
  };

  return (
    <div className="terminal bg-black text-green-400 font-mono p-4 rounded shadow-lg w-96 h-64 overflow-y-auto">
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
        className="bg-black text-green-400 w-full outline-none"
      />
    </div>
  );
}
