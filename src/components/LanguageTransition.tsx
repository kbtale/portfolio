"use client";

import { useLocale } from "next-intl";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LanguageTransition.module.css";

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LanguageTransitionContextType {
  transition: (nextLocale: string, callback: () => Promise<void> | void) => Promise<void>;
  isTransitioning: boolean;
}

const LanguageTransitionContext = createContext<LanguageTransitionContextType | null>(null);

export function useLanguageTransition() {
  const context = useContext(LanguageTransitionContext);
  if (!context) {
    throw new Error("useLanguageTransition must be used within a LanguageTransitionProvider");
  }
  return context;
}

export default function LanguageTransitionProvider({ children }: { children: ReactNode }) {
  const currentLocale = useLocale();
  const [targetLocale, setTargetLocale] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "exiting" | "entering">("idle");

  const transition = async (nextLocale: string, callback: () => Promise<void> | void) => {
    if (state !== "idle") return;

    setTargetLocale(nextLocale);
    
    // Start Exit
    setState("exiting");

    // Wait for exit animation (400ms matches CSS)
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Perform the actual switch
    await callback();

    // The component will now wait for currentLocale === targetLocale in the useEffect below
  };

  useEffect(() => {
    // If we are exiting and the locale has updated to match our target, start entering
    if (state === "exiting" && targetLocale && currentLocale === targetLocale) {
      // Small delay to ensure render is ready? usually immediate is fine
      (async () => {
         // Start Enter
         setState("entering");
         // Wait for enter animation (600ms matches CSS)
         await new Promise((resolve) => setTimeout(resolve, 600));
         // Reset
         setState("idle");
         setTargetLocale(null);
         
         // Trigger measurement refresh after layout stabilizes
         // This fixes scrollbars appearing due to incorrect measurements during animation
         setTimeout(() => {
            ScrollTrigger.refresh();
         }, 100);
      })();
    }
  }, [currentLocale, targetLocale, state]);

  return (
    <LanguageTransitionContext.Provider value={{ transition, isTransitioning: state !== "idle" }}>
      <div 
        className={`
          ${styles.wrapper} 
          ${state === "exiting" ? styles.exiting : ""} 
          ${state === "entering" ? styles.entering : ""}
        `}
      >
        {children}
      </div>
    </LanguageTransitionContext.Provider>
  );
}
