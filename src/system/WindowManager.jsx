import React from "react";
import { useSystemStore } from "../store/systemStore";
import Explorer from "../apps/Explorer";
import Settings from "../apps/Settings";
import Terminal from "../apps/Terminal";
import ProjectPublisher from "../components/ProjectPublisher";

export default function WindowManager() {
  const { openApps, closeApp } = useSystemStore();

  const renderApp = (name) => {
    switch (name) {
      case "Explorer": return <Explorer />;
      case "Settings": return <Settings />;
      case "Terminal": return <Terminal />;
      case "Project Publisher": return <ProjectPublisher />;
      default: return <div>Unknown App</div>;
    }
  };

  return (
    <>
      {openApps.map(app => (
        <div key={app.id} className="window" style={{ left: app.position.x, top: app.position.y, width: app.size.w, height: app.size.h }}>
          <div className="titlebar">
            <div>{app.name}</div>
            <div>
              <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
            </div>
          </div>
          <div className="content">
            {renderApp(app.name)}
          </div>
        </div>
      ))}
    </>
  );
}
