import React, { useEffect, useState } from "react";

export default function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500); // brief pause before desktop
          return 100;
        }
        return p + 2; // adjust for speed
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(145deg,#00111f,#000)",
        color: "#00cfff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <img
        src="/branding/webbro-logo.png" // temporary logo path
        alt="Web Bro OS Logo"
        style={{
          width: 120,
          height: 120,
          animation: "pulse 2s infinite",
          filter: "drop-shadow(0 0 10px #00e1ff)",
        }}
      />
      <div style={{ marginTop: 24, width: "60%", height: 8, background: "#022", borderRadius: 4 }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg,#00e1ff,#0078ff)",
            borderRadius: 4,
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <p style={{ marginTop: 12, fontSize: 14 }}>Starting Web Bro OS Mini… {progress}%</p>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
