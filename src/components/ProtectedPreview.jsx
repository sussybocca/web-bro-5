import React, { useMemo } from "react";
import DOMPurify from "dompurify";

/**
 * ProtectedPreview
 * - Sanitizes html with DOMPurify
 * - Removes <script> tags and inline event handlers (defense-in-depth)
 * - Injects a strong CSP meta tag
 * - Uses iframe sandbox WITHOUT allow-scripts and allow-same-origin
 */
export default function ProtectedPreview({ html = "", width = "100%", height = "420px" }) {
  const srcdoc = useMemo(() => {
    const base = html || "<div style='padding:16px;font-family:system-ui'>No content</div>";

    // Use DOMPurify with html profile
    const purifyConfig = { USE_PROFILES: { html: true } };
    let sanitized = DOMPurify.sanitize(base, purifyConfig);

    // Remove <script> tags as extra layer
    sanitized = sanitized.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

    // Remove inline event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

    // Prevent javascript: URIs
    sanitized = sanitized.replace(/\b(href|src)\s*=\s*(['"]?)\s*javascript:[^'"]*\2/gi, '$1="#"');

    const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https:; style-src 'unsafe-inline' https:; font-src https:;">`;

    return `<!doctype html><html><head><meta charset="utf-8">${csp}<meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${sanitized}</body></html>`;
  }, [html]);

  return (
    <div style={{ width, height, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
      <iframe
        title="Protected preview"
        srcDoc={srcdoc}
        sandbox="allow-forms allow-popups allow-modals"
        referrerPolicy="no-referrer"
        style={{ width: "100%", height: "100%", border: 0, background: "#fff" }}
      />
    </div>
  );
}
