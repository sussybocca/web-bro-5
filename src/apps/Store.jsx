import React, { useState, useMemo } from "react";
import { useSystemStore } from "../store/systemStore";

// Utility functions
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateUniqueName = (category) => {
  const adjectives = ["Quick", "Mega", "Ultra", "Smart", "Fun", "Next"];
  const nouns = {
    filter: ["Pix", "Snap", "Tone", "FX", "Edit", "Color"],
    social: ["Chat", "Feed", "Board", "Talk", "Post", "Buzz"],
    video: ["Play", "Stream", "Clip", "Cinema", "Vid", "Tube"],
  };
  const arr = nouns[category];
  return `${getRandomElement(adjectives)} ${getRandomElement(arr)}`;
};

// Fully functional app templates
const appTemplates = {
  filter: (name) => ({
    name,
    category: "Filter App",
    icon: "/icons/filter.svg",
    component: () => {
      const [brightness, setBrightness] = useState(100);
      return (
        <div style={{ padding: 16 }}>
          <h2>{name}</h2>
          <p>Adjust image brightness:</p>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
          <div
            style={{
              width: "100%",
              height: 200,
              marginTop: 16,
              backgroundImage: "url('/wallpapers/default.jpg')",
              backgroundSize: "cover",
              filter: `brightness(${brightness}%)`,
              borderRadius: 8,
            }}
          />
        </div>
      );
    },
  }),
  social: (name) => ({
    name,
    category: "Social Platform",
    icon: "/icons/social.svg",
    component: () => {
      const [posts, setPosts] = useState([]);
      const [input, setInput] = useState("");
      return (
        <div style={{ padding: 16 }}>
          <h2>{name}</h2>
          <input
            placeholder="Write a post..."
            style={{ width: "100%", padding: 6, marginBottom: 8 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            style={{ marginBottom: 16 }}
            onClick={() => {
              if (input) {
                setPosts([input, ...posts]);
                setInput("");
              }
            }}
          >
            Post
          </button>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {posts.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: 8,
                  marginBottom: 8,
                  background: "#0d1a2a",
                  borderRadius: 6,
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      );
    },
  }),
  video: (name) => ({
    name,
    category: "Videos",
    icon: "/icons/video.svg",
    component: () => (
      <div style={{ padding: 16 }}>
        <h2>{name}</h2>
        <video width="100%" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  }),
};

export default function Store() {
  const { openApp } = useSystemStore();
  const [search, setSearch] = useState("");

  // Generate hundreds of apps dynamically
  const apps = useMemo(() => {
    const generated = [];
    for (let i = 0; i < 50; i++) {
      // Each iteration generates 3 apps
      generated.push(appTemplates.filter(generateUniqueName("filter")));
      generated.push(appTemplates.social(generateUniqueName("social")));
      generated.push(appTemplates.video(generateUniqueName("video")));
    }
    // Filter by search
    return generated.filter(
      (app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Web Bro Web Store</h2>
      <input
        placeholder="Search apps..."
        style={{ width: "100%", marginBottom: 16, padding: 8 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {apps.map((app) => (
          <div
            key={app.name + app.category}
            style={{
              background: "#0d1a2a",
              borderRadius: 8,
              padding: 8,
              cursor: "pointer",
            }}
            onDoubleClick={() => openApp(app.name)}
          >
            <img src={app.icon} alt={app.name} style={{ width: 48, height: 48 }} />
            <div style={{ marginTop: 8, fontSize: 13 }}>{app.name}</div>
            <div style={{ fontSize: 11, color: "#8feda4" }}>{app.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
