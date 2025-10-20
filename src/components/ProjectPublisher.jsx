import React, { useState, useEffect } from "react";
import ProtectedPreview from "./ProtectedPreview";
import { useSystemStore } from "../store/systemStore";

/**
 * ProjectPublisher:
 * - Editor for a simple project HTML
 * - Protected preview (no scripts allowed)
 * - Download bundle (index.html) for hosting elsewhere (this file WILL include scripts if present)
 * - Save as "project" to local projects list (safe, stored in localStorage)
 */
export default function ProjectPublisher() {
  const starter = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Web Bro Project</title>
    <style>body{font-family:system-ui;padding:24px;background:#081223;color:#fff}</style>
  </head>
  <body>
    <h1>Hello Web Bro Project</h1>
    <p>This preview disables scripts. Download to run scripts on your own host.</p>
  </body>
</html>`;

  const { saveProject } = useSystemStore();
  const [html, setHtml] = useState(localStorage.getItem("wb_project_html") || starter);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("wb_project_html", html);
  }, [html]);

  const downloadIndex = () => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMsg("index.html downloaded. Host it on your server to run scripts.");
    setTimeout(() => setMsg(""), 4000);
  };

  const saveAsProject = () => {
    const name = prompt("Project name:");
    if (!name) return;
    const p = { id: Date.now(), name, html, created: Date.now() };
    saveProject(p);
    setMsg(`Saved '${name}' as a local project.`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div style={{ color: "white" }}>
      <h2>Project Publisher (Safe Preview)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>HTML Source</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            style={{
              width: "100%",
              height: 420,
              background: "#05101a",
              color: "#fff",
              padding: 10,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.04)",
              fontFamily: "ui-monospace, monospace",
            }}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button className="btn" onClick={downloadIndex}>
              Download index.html
            </button>
            <button className="btn" onClick={saveAsProject}>
              Save project locally
            </button>
            <button
              className="btn"
              onClick={() => {
                navigator.clipboard?.writeText(html);
                setMsg("Copied HTML to clipboard");
                setTimeout(() => setMsg(""), 2000);
              }}
            >
              Copy HTML
            </button>
          </div>
          {msg && <div style={{ marginTop: 8, color: "#8feda4" }}>{msg}</div>}
          <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            Preview is sanitized and scripts are disabled. To run scripts, download the project.
          </div>
        </div>
        <div>
          <ProtectedPreview html={html} />
        </div>
      </div>
    </div>
  );
}
