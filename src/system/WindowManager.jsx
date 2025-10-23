// src/system/WindowManager.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";
import { motion } from "framer-motion";
import AnimatedWallpaper from "./AnimatedWallpaper";

// Apps
import Explorer from "../apps/Explorer";
import Settings from "../apps/Settings";
import Terminal from "../apps/Terminal";
import ProjectPublisher from "../components/ProjectPublisher";
import Store from "../apps/Store";
import WebBoe from "../apps/WebBoe";
import FireBox from "../apps/FireBox";
import Betas from "../apps/Betas";
import WebBroMini from "../apps/WebBroMini";

export default function WindowManager() {
  const { openApps, closeApp } = useSystemStore();

  const renderApp = (name) => {
    switch (name) {
      case "Explorer": return <Explorer />;
      case "Settings": return <Settings />;
      case "Terminal": return <Terminal />;
      case "Project Publisher": return <ProjectPublisher />;
      case "Web Bro Web Store": return <Store />;
      case "WebBoe Browser": return <WebBoe />;
      case "FireBox": return <FireBox />;
      case "Betas": return <Betas />;
      case "Web Bro OS Mini": return <WebBroMini />;
      default: return <div>Unknown App</div>;
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Animated wallpaper behind all windows */}
      <AnimatedWallpaper />

      {/* Render draggable app windows above wallpaper */}
      {openApps.map((app) => (
        <motion.div
          key={app.id}
          drag
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - app.size.w,
            bottom: window.innerHeight - app.size.h
          }}
          style={{
            position: "absolute",
            left: app.position.x,
            top: app.position.y,
            width: app.size.w,
            height: app.size.h,
            zIndex: app.zIndex || 10, // keep windows above wallpaper
            background: "#0b1220",
            border: "1px solid #333",
            borderRadius: 6,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            className="titlebar flex justify-between items-center p-1 cursor-grab bg-gray-900"
          >
            <span>{app.name}</span>
            <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
          </div>
          <div className="content flex-1 overflow-auto p-2">
            {renderApp(app.name)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
