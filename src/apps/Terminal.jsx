import React, { useState } from "react";

export default function Terminal() {
  const [lines, setLines] = useState(["Welcome to Web Bro OS Terminal"]);
  const [input, setInput] = useState("");

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setLines([...lines, `> ${input}`, `You typed: ${input}`]);
      setInput("");
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-2 h-full overflow-auto">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <input
        className="bg-transparent outline-none text-green-400 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
    </div>
  );
}
