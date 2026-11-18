"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("prochchhod-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const enabled = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", enabled);
    setDark(enabled);
  }, []);

  function toggleTheme() {
    const enabled = !dark;
    document.documentElement.classList.toggle("dark", enabled);
    localStorage.setItem("prochchhod-theme", enabled ? "dark" : "light");
    setDark(enabled);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "হালকা থিম চালু করুন" : "ডার্ক থিম চালু করুন"}
      className="icon-button"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
