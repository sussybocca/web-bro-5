import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",       // output folder for prebuilt files
    assetsDir: "assets",  // folder for JS/CSS/images
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    target: "esnext",        // modern JS, keeps bundle small
    minify: "esbuild",       // fast minification
    sourcemap: false,        // disable source maps for deployment
    emptyOutDir: true,       // clears dist folder before build
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
