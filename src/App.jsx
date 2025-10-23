// src/App.jsx
import React, { useEffect, useState } from "react";
import Desktop from "./system/Desktop";
import Taskbar from "./system/Taskbar";
import StartMenu from "./system/StartMenu";
import WindowManager from "./system/WindowManager";
import FullscreenHandler from "./system/FullscreenHandler";
import { loadDefaultOS } from "./loaders/osLoader";
import { useSystemStore } from "./store/systemStore";
import LoadingScreen from "./system/LoadingScreen";
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
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen />;

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
