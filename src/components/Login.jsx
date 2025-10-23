// src/components/Login.jsx
import React, { useState } from "react";
import LoginPage from "react-login-page"; // the actual npm component
import Desktop from "../system/Desktop.jsx";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      // Call your Node.js backend API
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        setLoggedIn(true);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    }
  };

  if (loggedIn) {
    return <Desktop />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <LoginPage onSubmit={handleLogin} />
    </div>
  );
}
