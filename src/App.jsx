// src/App.jsx
import React, { useEffect, useState } from "react";
import Desktop from "./system/Desktop.jsx";
import Taskbar from "./system/Taskbar.jsx";
import StartMenu from "./system/StartMenu.jsx";
import WindowManager from "./system/WindowManager.jsx";
import FullscreenHandler from "./system/FullscreenHandler.jsx";
import { loadDefaultOS } from "./loaders/osLoader.js";
import { useSystemStore } from "./store/systemStore.js";

export default function App() {
  const setOS = useSystemStore((s) => s.setOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDefaultOS()
      .then((os) => {
        setOS(os);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
        color: "#9fb3d8",
        fontSize: "1.2rem",
      }}>
        Booting Web Bro OS...
      </div>
    );
  }

  return (
    <FullscreenHandler>
      <Desktop />
      <WindowManager />
      <Taskbar />
      <StartMenu />
    </FullscreenHandler>
  );
}
