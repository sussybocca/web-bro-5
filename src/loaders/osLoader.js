export async function loadDefaultOS() {
  try {
    const manifest = await fetch("/sample-os/manifest.json").then(r => r.json());
    const theme = await fetch(manifest.theme).then(r => r.json());

    // Apply accent color
    if (theme?.accent) {
      document.documentElement.style.setProperty("--accent", theme.accent);
      localStorage.setItem("wb_accent", theme.accent);
    }

    // Wallpaper: use manifest wallpaper unless user has custom saved one
    const custom = localStorage.getItem("wb_custom_wallpaper");
    const wallpaper = custom || manifest.wallpaper || "/wallpapers/default.jpg";

    return { wallpaper, theme, name: manifest.name };
  } catch (err) {
    console.error("Failed to load default OS:", err);
    return { wallpaper: "/wallpapers/default.jpg", theme: {}, name: "Web Bro OS" };
  }
}
