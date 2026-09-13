"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AccentOption {
  key: string;
  name: string;
  color: string;      // HEX
  rgb: string;        // r, g, b
  hoverColor: string; // HEX
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    key: "lime",
    name: "Lime (Default)",
    color: "#a3e635",
    rgb: "163, 230, 53",
    hoverColor: "#84cc16",
  },
  {
    key: "mint",
    name: "Light Mint",
    color: "#34d399",
    rgb: "52, 211, 153",
    hoverColor: "#10b981",
  },
  {
    key: "yellow",
    name: "Sun Yellow",
    color: "#facc15",
    rgb: "250, 204, 21",
    hoverColor: "#eab308",
  },
  {
    key: "orange",
    name: "Amber Orange",
    color: "#f97316",
    rgb: "249, 115, 22",
    hoverColor: "#ea580c",
  },
  {
    key: "icecyan",
    name: "Electric Ice Cyan",
    color: "#38edf8",
    rgb: "56, 237, 248",
    hoverColor: "#00d2f0",
  },
  {
    key: "turquoise",
    name: "Turquoise",
    color: "#2dd4bf",
    rgb: "45, 212, 191",
    hoverColor: "#14b8a6",
  },
];

interface ThemeAccentContextType {
  activeAccent: AccentOption;
  setAccent: (key: string) => void;
}

const ThemeAccentContext = createContext<ThemeAccentContextType>({
  activeAccent: ACCENT_OPTIONS[0],
  setAccent: () => {},
});

export function ThemeAccentProvider({ children }: { children: React.ReactNode }) {
  const [activeAccent, setActiveAccent] = useState<AccentOption>(ACCENT_OPTIONS[0]);

  useEffect(() => {
    const savedKey = localStorage.getItem("portfolio_theme_accent");
    if (savedKey) {
      const found = ACCENT_OPTIONS.find((opt) => opt.key === savedKey);
      if (found) {
        setActiveAccent(found);
        applyAccent(found);
      }
    }
  }, []);

  function applyAccent(accent: AccentOption) {
    const root = document.documentElement;
    root.style.setProperty("--accent-color", accent.color);
    root.style.setProperty("--accent-rgb", accent.rgb);
    root.style.setProperty("--accent-hover", accent.hoverColor);
  }

  function setAccent(key: string) {
    const found = ACCENT_OPTIONS.find((opt) => opt.key === key) || ACCENT_OPTIONS[0];
    setActiveAccent(found);
    localStorage.setItem("portfolio_theme_accent", found.key);
    applyAccent(found);
  }

  return (
    <ThemeAccentContext.Provider value={{ activeAccent, setAccent }}>
      {children}
    </ThemeAccentContext.Provider>
  );
}

export function useThemeAccent() {
  return useContext(ThemeAccentContext);
}
