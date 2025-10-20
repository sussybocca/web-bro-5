import React, { useEffect } from "react";

export default function FullscreenHandler({ children }) {
  useEffect(() => {
    // Try to request fullscreen once on load (best-effort), but don't force user
    const req = async () => {
      try {
        const el = document.documentElement;
        if (el.requestFullscreen && !document.fullscreenElement) {
          // don't auto-open if browser blocks; we try anyway
          await el.requestFullscreen?.();
        }
      } catch (e) {
        // ignore
      }
    };
    req();
  }, []);

  return <>{children}</>;
}
