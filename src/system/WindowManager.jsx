// src/system/WindowManager.jsx
import React from "react";
import { useSystemStore } from "../store/systemStore";
import { motion } from "framer-motion";

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

// Import global CSS
import "../styles/global.css";

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
    <div className="desktop">
      {/* Draggable app windows */}
      {openApps.map((app) => (
        <motion.div
          key={app.id}
          drag
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - app.size.w,
            bottom: window.innerHeight - app.size.h,
          }}
          className="window"
          style={{
            left: app.position.x,
            top: app.position.y,
            width: app.size.w,
            height: app.size.h,
            zIndex: app.zIndex || 10,
          }}
        >
          {/* Titlebar */}
          <div className="titlebar">
            <span>{app.name}</span>
            <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
          </div>

          {/* App content */}
          <div className="content">
            {renderApp(app.name)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
