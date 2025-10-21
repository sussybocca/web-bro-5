import React, { useState, useEffect } from "react";
import { useSystemStore } from "../store/systemStore";

export default function Settings() {
  const { setWallpaper, setTheme } = useSystemStore(); // Assume systemStore manages OS state
  const [wallpaper, setLocalWallpaper] = useState(localStorage.getItem("wb_wallpaper") || "");
  const [theme, setLocalTheme] = useState(localStorage.getItem("wb_theme") || "light");

  // Update store and localStorage when wallpaper changes
  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalWallpaper(url);
    setWallpaper(url);
    localStorage.setItem("wb_wallpaper", url);
  };

  // Update store and localStorage when theme changes
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setLocalTheme(newTheme);
    setTheme(newTheme);
    localStorage.setItem("wb_theme", newTheme);
  };

  useEffect(() => {
    // Load saved preferences on mount
    if (wallpaper) setWallpaper(wallpaper);
    if (theme) setTheme(theme);
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      
      <div className="mb-4">
        <label className="block mb-1">Change Wallpaper:</label>
        <input type="file" accept="image/*" onChange={handleWallpaperChange} />
        {wallpaper && <img src={wallpaper} alt="Wallpaper preview" className="mt-2 w-48 h-28 object-cover rounded" />}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Theme:</label>
        <select value={theme} onChange={handleThemeChange} className="bg-gray-800 text-white p-1 rounded">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <p className="text-gray-400 text-sm">
        Your wallpaper and theme preferences are saved locally and will persist across sessions.
      </p>
    </div>
  );
}
