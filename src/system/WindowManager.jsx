import React, { useRef } from "react";
import { useSystemStore } from "../store/systemStore";
import Explorer from "../apps/Explorer";
import Settings from "../apps/Settings";
import Terminal from "../apps/Terminal";
import ProjectPublisher from "../components/ProjectPublisher";

export default function WindowManager() {
  const { openApps, closeApp } = useSystemStore();
  const dragData = useRef({ isDragging: false, appId: null, offsetX: 0, offsetY: 0 });

  const renderApp = (name) => {
    switch (name) {
      case "Explorer": return <Explorer />;
      case "Settings": return <Settings />;
      case "Terminal": return <Terminal />;
      case "Project Publisher": return <ProjectPublisher />;
      default: return <div>Unknown App</div>;
    }
  };

  // Start dragging
  const onStartDrag = (x, y, app) => {
    dragData.current = {
      isDragging: true,
      appId: app.id,
      offsetX: x - app.position.x,
      offsetY: y - app.position.y
    };
  };

  const onMouseDown = (e, app) => {
    onStartDrag(e.clientX, e.clientY, app);
    e.preventDefault();
  };

  const onTouchStart = (e, app) => {
    const touch = e.touches[0];
    onStartDrag(touch.clientX, touch.clientY, app);
  };

  // Move window
  const onMove = (x, y) => {
    if (!dragData.current.isDragging) return;
    const { appId, offsetX, offsetY } = dragData.current;
    const newX = x - offsetX;
    const newY = y - offsetY;

    useSystemStore.setState((s) => ({
      openApps: s.openApps.map((app) =>
        app.id === appId ? { ...app, position: { x: newX, y: newY } } : app
      )
    }));
  };

  const onMouseMove = (e) => onMove(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    const touch = e.touches[0];
    onMove(touch.clientX, touch.clientY);
  };

  // Stop dragging
  const onMouseUp = () => { dragData.current.isDragging = false; };
  const onTouchEnd = () => { dragData.current.isDragging = false; };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {openApps.map((app) => (
        <div
          key={app.id}
          className="window"
          style={{
            position: "absolute",
            left: app.position.x,
            top: app.position.y,
            width: app.size.w,
            height: app.size.h,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            backgroundColor: "#0b1220",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            userSelect: "none"
          }}
        >
          <div
            className="titlebar"
            style={{
              cursor: "grab",
              backgroundColor: "#111827",
              padding: "4px 8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            onMouseDown={(e) => onMouseDown(e, app)}
            onTouchStart={(e) => onTouchStart(e, app)}
          >
            <div>{app.name}</div>
            <div>
              <button className="btn" onClick={() => closeApp(app.id)}>✖</button>
            </div>
          </div>
          <div className="content" style={{ flex: 1, overflow: "auto", padding: 8 }}>
            {renderApp(app.name)}
          </div>
        </div>
      ))}
    </div>
  );
}
