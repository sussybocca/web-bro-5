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
import BootScreen from "./system/BootScreen";

export default function App() {
  const setOS = useSystemStore((s) => s.setOS);
  const [loading, setLoading] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

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

  if (loading) return <div>Loading system...</div>;

  // Show BootScreen until boot sequence is complete
  if (!bootComplete) return <BootScreen onBootComplete={() => setBootComplete(true)} />;

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
