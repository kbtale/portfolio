"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "./ThemeContext";
import styles from "./LoadingScreen.module.css";

const MINIMUM_DISPLAY_MS = 2000;
const PROGRESS_INTERVAL_MS = 30;

export default function LoadingScreen() {
  const { currentPalette } = useTheme();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const startTimeRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const fontsReadyRef = useRef(false);
  const windowLoadedRef = useRef(false);

  // Calculate the real target progress based on load signals
  const getTargetProgress = useCallback(() => {
    let p = 0;

    if (document.readyState === "loading") p = 20;
    else if (document.readyState === "interactive") p = 45;
    else if (document.readyState === "complete") p = 65;

    if (fontsReadyRef.current) p += 15;
    if (windowLoadedRef.current) p += 20;

    return Math.min(p, 100);
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Lock scroll and hide scrollbar via class
    window.lenis?.stop();
    const html = document.documentElement;
    html.classList.add("hide-scrollbar");

    // --- Listen for real load signals and update target ---
    const updateTarget = () => {
      targetProgressRef.current = getTargetProgress();
    };

    document.addEventListener("readystatechange", updateTarget);

    document.fonts.ready.then(() => {
      fontsReadyRef.current = true;
      updateTarget();
    });

    const onLoad = () => {
      windowLoadedRef.current = true;
      updateTarget();
    };

    if (document.readyState === "complete") {
      windowLoadedRef.current = true;
    }
    window.addEventListener("load", onLoad);

    // Initial target
    updateTarget();

    // --- Smooth animated progress ticker ---
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = targetProgressRef.current;
        const elapsed = Date.now() - startTimeRef.current;
        const minTimeRatio = Math.min(elapsed / MINIMUM_DISPLAY_MS, 1);

        // Don't let display exceed time-based progress (min display time enforcement)
        const timeCap = Math.round(minTimeRatio * 100);

        // Smoothly approach the target (ease towards it)
        const gap = target - prev;
        const step = Math.max(1, Math.ceil(gap * 0.08));
        const next = Math.min(prev + step, target, timeCap);

        return next;
      });
    }, PROGRESS_INTERVAL_MS);

    return () => {
      window.lenis?.start();
      document.removeEventListener("readystatechange", updateTarget);
      window.removeEventListener("load", onLoad);
      clearInterval(interval);
    };
  }, [getTargetProgress]);

  // Trigger exit when display progress reaches 100
  useEffect(() => {
    if (displayProgress < 100) return;

    // Small extra delay so user sees the full bar
    const timer = setTimeout(() => {
      setPhase("exiting");
    }, 300);

    return () => clearTimeout(timer);
  }, [displayProgress]);

  // Remove from DOM after exit animation completes
  useEffect(() => {
    if (phase !== "exiting") return;

    const timer = setTimeout(() => {
      window.lenis?.start();
      document.documentElement.classList.remove("hide-scrollbar");
      setPhase("done");
    }, 1200); // matches CSS animation duration + buffer

    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  const overlayClass = [
    styles.overlay,
    phase === "exiting" ? styles.exiting : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClass}
      aria-live="polite"
      aria-label="Loading site"
    >
      {/* Top split panel */}
      <div
        className={styles.topPanel}
        style={{ background: currentPalette.background }}
      />

      {/* Bottom split panel */}
      <div
        className={styles.bottomPanel}
        style={{ background: currentPalette.background }}
      />

      {/* Center content */}
      <div className={styles.centerContent}>
        <div className={styles.nameBlock}>
          <span className={styles.firstName}>Carlos</span>
          <span className={styles.lastName}>Bolívar</span>
        </div>

        <div className={styles.progressArea}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${displayProgress}%`,
                background: currentPalette.accent_1,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <span className={styles.progressText}>Loading</span>
            <span
              className={styles.percentage}
              style={{ color: currentPalette.accent_1 }}
            >
              {displayProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
