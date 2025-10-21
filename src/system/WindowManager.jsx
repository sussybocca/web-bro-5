import React, { useRef } from "react";
import { useSystemStore } from "../store/systemStore";
import Explorer from "../apps/Explorer";
import Settings from "../apps/Settings";
import Terminal from "../apps/Terminal";
import ProjectPublisher from "../components/ProjectPublisher";

export default function WindowManager() {
  const { openApps, closeApp, bringToFront, updateAppPosition } = useSystemStore();
  const dragRefs = useRef({}); // Track dragging state per window

  const renderApp = (name) => {
    switch (name) {
      case "Explorer":
        return <Explorer />;
      case "Settings":
        return <Settings />;
      case "Terminal":
        return <Terminal />;
      case "Project Publisher":
        return <ProjectPublisher />;
      default:
        return <div>Unknown App</div>;
    }
  };

  const handleMouseDown = (e, app) => {
    bringToFront(app.id); // Bring window to front
    dragRefs.current[app.id] = {
      offsetX: e.clientX - app.position.x,
      offsetY: e.clientY - app.position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    Object.keys(dragRefs.current).forEach((id) => {
      const drag = dragRefs.current[id];
      if (drag) {
        const x = e.clientX - drag.offsetX;
        const y = e.clientY - drag.offsetY;
        updateAppPosition(Number(id), { x, y });
      }
    });
  };

  const handleMouseUp = () => {
    dragRefs.current = {};
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {openApps.map((app) => (
        <div
          key={app.id}
          className="window"
          style={{
            left: app.position.x,
            top: app.position.y,
            width: app.size.w,
            height: app.size.h,
            position: "absolute",
            zIndex: app.zIndex || 1,
          }}
        >
          <div
            className="titlebar"
            style={{ cursor: "grab" }}
            onMouseDown={(e) => handleMouseDown(e, app)}
          >
            <div>{app.name}</div>
            <div>
              <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
            </div>
          </div>
          <div className="content">{renderApp(app.name)}</div>
        </div>
      ))}
    </>
  );
}
