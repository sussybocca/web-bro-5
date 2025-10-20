import { create } from "zustand";

const initialDrives = () => {
  // if drives in localStorage, return parsed
  try {
    const saved = localStorage.getItem("wb_drives");
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    C: [{ type: "dir", name: "Program Files" }, { type: "dir", name: "Users" }, { type: "dir", name: "Temp" }],
    D: [{ type: "dir", name: "Documents" }, { type: "dir", name: "Games" }]
  };
};

export const useSystemStore = create((set, get) => ({
  wallpaper: "/wallpapers/default.jpg",
  osLoaded: false,
  openApps: [],
  startOpen: false,
  theme: "dark",
  drives: initialDrives(),
  projects: JSON.parse(localStorage.getItem("wb_projects") || "[]"), // server/project entries

  setOS: (os) => set({ osLoaded: true, wallpaper: os.wallpaper, theme: os.theme?.background ? "dark" : "dark" }),
  setWallpaper: (url) => {
    localStorage.setItem("wb_custom_wallpaper", url);
    set({ wallpaper: url });
  },
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("wb_theme", theme);
  },
  setAccent: (color) => {
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem("wb_accent", color);
  },

  openApp: (name) => {
    const apps = get().openApps;
    const id = Date.now();
    const pos = { x: 80 + (apps.length * 20), y: 80 + (apps.length * 20) };
    set({ openApps: [...apps, { id, name, position: pos, size: { w: 640, h: 420 } }] });
  },

  closeApp: (id) => set((s) => ({ openApps: s.openApps.filter(a => a.id !== id) })),
  toggleStart: () => set((s) => ({ startOpen: !s.startOpen })),

  refreshDrives: () => {
    const d = get().drives;
    localStorage.setItem("wb_drives", JSON.stringify(d));
    set({ drives: d });
  },

  createFolder: (drive, name) => {
    set((s) => {
      const d = { ...s.drives };
      d[drive] = [...(d[drive] || []), { type: "dir", name }];
      localStorage.setItem("wb_drives", JSON.stringify(d));
      return { drives: d };
    });
  },

  createFile: (drive, name, content) => {
    set((s) => {
      const d = { ...s.drives };
      d[drive] = [...(d[drive] || []), { type: "file", name, content }];
      localStorage.setItem("wb_drives", JSON.stringify(d));
      return { drives: d };
    });
  },

  readFile: (drive, name) => {
    const d = get().drives;
    const item = (d[drive] || []).find(i => i.name === name && i.type === "file");
    return item ? item.content : null;
  },

  saveProject: (project) => {
    set((s) => {
      const newProjects = [...s.projects, project];
      localStorage.setItem("wb_projects", JSON.stringify(newProjects));
      return { projects: newProjects };
    });
  },

  listProjects: () => get().projects
}));
