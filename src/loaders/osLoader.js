export async function loadDefaultOS() {
  try {
    const manifest = await fetch("/sample-os/manifest.json").then(r => r.json());
    const theme = await fetch(manifest.theme).then(r => r.json());

    // Map old app strings to objects compatible with useSystemStore
    const desktopApps = (manifest.apps || []).map((name) => ({ name }));

    // Wallpaper: use manifest wallpaper unless user has custom saved one
    const wallpaper = localStorage.getItem("wb_custom_wallpaper") || manifest.wallpaper || "/wallpapers/default.jpg";

    return { wallpaper, theme, name: manifest.name, desktopApps };
  } catch (err) {
    console.error("Failed to load default OS:", err);
    return { wallpaper: "/wallpapers/default.jpg", theme: {}, name: "Web Bro OS", desktopApps: [] };
  }
}
