"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Palette = {
  name: string;
  background: string;
  text: string;
  sub_neutral: string;
  accent_1: string;
  accent_2: string;
  action_hover: string;
};

const palettes: Palette[] = [
  {
    name: "Terracotta (Original)",
    background: "#FFF5EC",
    text: "#402E32",
    sub_neutral: "#F6DCD6",
    accent_1: "#DC753C",
    accent_2: "#C94D3D",
    action_hover: "#C47F5B",
  },
  {
    name: "Cyberpunk Neon (Dark)",
    background: "#0b0c15",
    text: "#E0E0E0",
    sub_neutral: "#2A2D3E",
    accent_1: "#00FF9F",
    accent_2: "#FF0055",
    action_hover: "#00CC80",
  },
  {
    name: "Midnight Solar (Dark)",
    background: "#002B36",
    text: "#93A1A1",
    sub_neutral: "#073642",
    accent_1: "#268BD2",
    accent_2: "#B58900",
    action_hover: "#2075C7",
  },
  {
    name: "Deep Forest (Dark)",
    background: "#1A1D1A",
    text: "#E8F5E9",
    sub_neutral: "#2C3E2E",
    accent_1: "#4CAF50",
    accent_2: "#81C784",
    action_hover: "#388E3C",
  },
  {
    name: "Royal Luxury (Dark)",
    background: "#121212",
    text: "#FCFCFC",
    sub_neutral: "#2D2D2D",
    accent_1: "#D4AF37",
    accent_2: "#757575",
    action_hover: "#B4941F",
  },
  {
    name: "Vampire (Dark)",
    background: "#282A36",
    text: "#F8F8F2",
    sub_neutral: "#44475A",
    accent_1: "#BD93F9",
    accent_2: "#FF79C6",
    action_hover: "#6272A4",
  },
  {
    name: "Oceanic Depth (Dark)",
    background: "#0F1C24",
    text: "#E0F7FA",
    sub_neutral: "#1E333E",
    accent_1: "#00BCD4",
    accent_2: "#FF6F00",
    action_hover: "#0097A7",
  },
  {
    name: "Lavender Haze (Pop)",
    background: "#F3E5F5",
    text: "#4A148C",
    sub_neutral: "#E1BEE7",
    accent_1: "#9C27B0",
    accent_2: "#AB47BC",
    action_hover: "#7B1FA2",
  },
  {
    name: "Brutalist (Contrast)",
    background: "#FFFFFF",
    text: "#000000",
    sub_neutral: "#E0E0E0",
    accent_1: "#0000FF",
    accent_2: "#FF0000",
    action_hover: "#0000CC",
  },
  {
    name: "Terminal (Retro)",
    background: "#0D0D0D",
    text: "#33FF00",
    sub_neutral: "#1A1A1A",
    accent_1: "#33FF00",
    accent_2: "#008F11",
    action_hover: "#26BF00",
  },
  {
    name: "Cherry Blossom (Soft)",
    background: "#FFF0F5",
    text: "#5C2C35",
    sub_neutral: "#FFC0CB",
    accent_1: "#FF69B4",
    accent_2: "#DB7093",
    action_hover: "#C71585",
  },
  {
    name: "Slate & Orange (Dark)",
    background: "#27272A",
    text: "#FAFAFA",
    sub_neutral: "#3F3F46",
    accent_1: "#F97316",
    accent_2: "#38BDF8",
    action_hover: "#EA580C",
  },
  {
    name: "Fintech Blue (Light)",
    background: "#F0F4F8",
    text: "#102A43",
    sub_neutral: "#BCCCDC",
    accent_1: "#334E68",
    accent_2: "#627D98",
    action_hover: "#243B53",
  },
  {
    name: "Nordic Snow (Minimal)",
    background: "#FFFFFF",
    text: "#2E3440",
    sub_neutral: "#ECEFF4",
    accent_1: "#5E81AC",
    accent_2: "#88C0D0",
    action_hover: "#4C566A",
  },
  {
    name: "Synthwave Sunset (Dark)",
    background: "#241235",
    text: "#FFEEBB",
    sub_neutral: "#432C58",
    accent_1: "#FF2A6D",
    accent_2: "#05D9E8",
    action_hover: "#D11E56",
  },
  {
    name: "Bumblebee (High Contrast)",
    background: "#111111",
    text: "#FFFFFF",
    sub_neutral: "#333333",
    accent_1: "#FBBF24",
    accent_2: "#F59E0B",
    action_hover: "#D97706",
  },
];

type ThemeContextType = {
  currentPalette: Palette;
  paletteIndex: number;
  nextPalette: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const hexToRgb = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [index, setIndex] = useState(0);

  const nextPalette = () => {
    setIndex((prev) => (prev + 1) % palettes.length);
  };

  const currentPalette = palettes[index];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", currentPalette.background);
    root.style.setProperty("--background-rgb", hexToRgb(currentPalette.background));
    root.style.setProperty("--foreground", currentPalette.text);
    root.style.setProperty("--foreground-rgb", hexToRgb(currentPalette.text));
    root.style.setProperty("--text-primary", currentPalette.text);
    root.style.setProperty("--text-secondary", currentPalette.accent_2);
    root.style.setProperty("--accent-primary", currentPalette.accent_1);
    root.style.setProperty("--accent-secondary", currentPalette.accent_2);
    root.style.setProperty("--accent-orange", currentPalette.accent_1);
    root.style.setProperty("--accent-pink", currentPalette.sub_neutral);
    root.style.setProperty("--button-primary-hover", currentPalette.action_hover);

    // Dynamic Scrollbar Colors
    root.style.setProperty("--scrollbar-thumb", currentPalette.accent_1);
    root.style.setProperty("--scrollbar-thumb-hover", currentPalette.action_hover);
    root.style.setProperty("--scrollbar-track", currentPalette.background);
  }, [currentPalette]);

  return (
    <ThemeContext.Provider value={{ currentPalette, paletteIndex: index, nextPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
