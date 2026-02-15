"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useSyncExternalStore, useRef } from "react";
import ThemeToast from "./ThemeToast";
import ThemeTransition, { ThemeTransitionHandle } from "./ThemeTransition";

export type Palette = {
  name: string;
  background: string;
  text: string;
  sub_neutral: string;
  accent_1: string;
  accent_2: string;
  action_hover: string;
  on_accent: string; // Color to use on top of accent_1
};

const palettes: Palette[] = [
  {
    name: "Clawd",
    background: "#FFF5EC",
    text: "#402E32",
    sub_neutral: "#F6DCD6",
    accent_1: "#DC753C",
    accent_2: "#C94D3D",
    action_hover: "#C47F5B",
    on_accent: "#402E32",
  },
  {
    name: "Vulpimancer",
    background: "#111111",
    text: "#FFFFFF",
    sub_neutral: "#333333",
    accent_1: "#FBBF24",
    accent_2: "#F59E0B",
    action_hover: "#D97706",
    on_accent: "#111111",
  },
  {
    name: "Neon",
    background: "#0b0c15",
    text: "#E0E0E0",
    sub_neutral: "#2A2D3E",
    accent_1: "#00FF9F",
    accent_2: "#FF0055",
    action_hover: "#00CC80",
    on_accent: "#0b0c15",
  },
  {
    name: "Midnight Eclipse",
    background: "#002B36",
    text: "#93A1A1",
    sub_neutral: "#073642",
    accent_1: "#268BD2",
    accent_2: "#B58900",
    action_hover: "#2075C7",
    on_accent: "#002B36",
  },
  {
    name: "Dark Forest",
    background: "#1A1D1A",
    text: "#E8F5E9",
    sub_neutral: "#2C3E2E",
    accent_1: "#4CAF50",
    accent_2: "#81C784",
    action_hover: "#388E3C",
    on_accent: "#E8F5E9",
  },
  {
    name: "Wololo",
    background: "#121212",
    text: "#FCFCFC",
    sub_neutral: "#2D2D2D",
    accent_1: "#D4AF37",
    accent_2: "#757575",
    action_hover: "#B4941F",
    on_accent: "#FCFCFC",
  },
  {
    name: "The Vampire Diaries",
    background: "#282A36",
    text: "#F8F8F2",
    sub_neutral: "#44475A",
    accent_1: "#BD93F9",
    accent_2: "#FF79C6",
    action_hover: "#6272A4",
    on_accent: "#F8F8F2",
  },
  {
    name: "Europa Moon",
    background: "#0F1C24",
    text: "#E0F7FA",
    sub_neutral: "#1E333E",
    accent_1: "#00BCD4",
    accent_2: "#FF6F00",
    action_hover: "#0097A7",
    on_accent: "#E0F7FA",
  },
  {
    name: "Lavender Haze",
    background: "#F3E5F5",
    text: "#4A148C",
    sub_neutral: "#E1BEE7",
    accent_1: "#9C27B0",
    accent_2: "#AB47BC",
    action_hover: "#7B1FA2",
    on_accent: "#F3E5F5",
  },
  {
    name: "Thailand",
    background: "#FFFFFF",
    text: "#000000",
    sub_neutral: "#E0E0E0",
    accent_1: "#0000FF",
    accent_2: "#FF0000",
    action_hover: "#0000CC",
    on_accent: "#FFFFFF",
  },
  {
    name: "Matrix",
    background: "#0D0D0D",
    text: "#33FF00",
    sub_neutral: "#1A1A1A",
    accent_1: "#33FF00",
    accent_2: "#008F11",
    action_hover: "#26BF00",
    on_accent: "#0D0D0D",
  },
  {
    name: "Cherry Blossom",
    background: "#FFF0F5",
    text: "#5C2C35",
    sub_neutral: "#FFC0CB",
    accent_1: "#FF69B4",
    accent_2: "#DB7093",
    action_hover: "#C71585",
    on_accent: "#5C2C35",
  },
  {
    name: "Hellboy",
    background: "#27272A",
    text: "#FAFAFA",
    sub_neutral: "#3F3F46",
    accent_1: "#F97316",
    accent_2: "#38BDF8",
    action_hover: "#EA580C",
    on_accent: "#FAFAFA",
  },
  {
    name: "Hospital",
    background: "#F0F4F8",
    text: "#102A43",
    sub_neutral: "#BCCCDC",
    accent_1: "#334E68",
    accent_2: "#627D98",
    action_hover: "#243B53",
    on_accent: "#F0F4F8",
  },
  {
    name: "Nordic Snow",
    background: "#FFFFFF",
    text: "#2E3440",
    sub_neutral: "#ECEFF4",
    accent_1: "#5E81AC",
    accent_2: "#88C0D0",
    action_hover: "#4C566A",
    on_accent: "#FFFFFF",
  },
  {
    name: "Katana Zero",
    background: "#241235",
    text: "#FFEEBB",
    sub_neutral: "#432C58",
    accent_1: "#FF2A6D",
    accent_2: "#05D9E8",
    action_hover: "#D11E56",
    on_accent: "#FFEEBB",
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
  const [showToast, setShowToast] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<ThemeTransitionHandle>(null);

  // Sync with system dark mode preference with useSyncExternalStore
  const isSystemDark = useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false // Default to light mode (Clawd) on server
  );

  // Compute actual palette order based on preference
  const orderedPalettes = useMemo(() => {
    if (!isSystemDark) return palettes;
    const newPalettes = [...palettes];
    // Swapping index 0 (Clawd) and 1 (Vulpimancer)
    const [a, b] = [newPalettes[0], newPalettes[1]];
    newPalettes[0] = b;
    newPalettes[1] = a;
    return newPalettes;
  }, [isSystemDark]);

  const nextPalette = async () => {
    if (isTransitioning || !transitionRef.current) return;
    
    setIsTransitioning(true);
    const nextIdx = (index + 1) % orderedPalettes.length;

    await transitionRef.current.play(() => {
      setIndex(nextIdx);
      setShowToast(true);
    });

    setIsTransitioning(false);
  };

  const currentPalette = orderedPalettes[index];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", currentPalette.background);
    root.style.setProperty("--background-rgb", hexToRgb(currentPalette.background));
    root.style.setProperty("--foreground", currentPalette.text);
    root.style.setProperty("--foreground-rgb", hexToRgb(currentPalette.text));
    root.style.setProperty("--text-primary", currentPalette.text);
    root.style.setProperty("--text-secondary", currentPalette.accent_2);
    root.style.setProperty("--accent-primary", currentPalette.accent_1);
    root.style.setProperty("--accent-primary-rgb", hexToRgb(currentPalette.accent_1));
    root.style.setProperty("--accent-secondary", currentPalette.accent_2);
    root.style.setProperty("--accent-secondary-rgb", hexToRgb(currentPalette.accent_2));
    root.style.setProperty("--accent-orange", currentPalette.accent_1);
    root.style.setProperty("--accent-pink", currentPalette.sub_neutral);
    root.style.setProperty("--button-primary-hover", currentPalette.action_hover);
    root.style.setProperty("--text-on-accent", currentPalette.on_accent);

    // Dynamic Scrollbar Colors - Use -theme suffix to allow class overrides without !important
    root.style.setProperty("--scrollbar-thumb-theme", currentPalette.accent_1);
    root.style.setProperty("--scrollbar-thumb-hover-theme", currentPalette.action_hover);
    root.style.setProperty("--scrollbar-track", currentPalette.background);
  }, [currentPalette]);

  return (
    <ThemeContext.Provider value={{ currentPalette, paletteIndex: index, nextPalette }}>
      {children}
      <ThemeToast 
        palette={currentPalette} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
      <ThemeTransition ref={transitionRef} />
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
