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
    const bootDelay = setTimeout(() => {
      loadDefaultOS()
        .then((os) => {
          setOS(os);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 2000); // small delay to show the boot animation
    return () => clearTimeout(bootDelay);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at center, #10192b, #050a12)",
          color: "#c7d3ec",
          fontFamily: "system-ui, sans-serif",
          overflow: "hidden",
        }}
      >
        <img
          src="/icons/webbro-logo.png"
          alt="Web Bro OS Logo"
          style={{
            width: 120,
            height: 120,
            borderRadius: "20%",
            marginBottom: 24,
            animation: "fadeIn 2s ease-in-out",
          }}
        />
        <h1 style={{ fontSize: "1.6rem", marginBottom: 12 }}>Web Bro OS</h1>
        <p style={{ opacity: 0.8 }}>Booting system...</p>

        <div
          style={{
            marginTop: 32,
            width: 220,
            height: 6,
            borderRadius: 4,
            background: "#1c2942",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, #3d8bfd, #8da9ff)",
              animation: "loadBar 2s infinite ease-in-out",
            }}
          ></div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes loadBar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(30%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
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
