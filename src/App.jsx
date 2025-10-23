// src/App.jsx
import React, { useEffect, useState } from "react";
import Desktop from "./system/Desktop";
import Taskbar from "./system/Taskbar";
import StartMenu from "./system/StartMenu";
import WindowManager from "./system/WindowManager";
import FullscreenHandler from "./system/FullscreenHandler";
import { loadDefaultOS } from "./loaders/osLoader";
import { useSystemStore } from "./store/systemStore";
import CustomCursor from "./system/CustomCursor";

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
        console.error("Error loading OS:", err);
        setLoading(false);
      });
  }, [setOS]);

  if (loading) return <div className="text-white bg-black flex items-center justify-center h-screen">Loading system...</div>;

  // Directly render the desktop environment (skip BootScreen)
  return (
    <FullscreenHandler>
      <CustomCursor />
      <Desktop />
      <WindowManager />
      <Taskbar />
      <StartMenu />
    </FullscreenHandler>
  );
}
