"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Palette } from "./ThemeContext";
import styles from "./ThemeToast.module.css";

interface ThemeToastProps {
  palette: Palette;
  isVisible: boolean;
  onClose: () => void;
}

export default function ThemeToast({ palette, isVisible, onClose }: ThemeToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = React.useCallback(() => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        x: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.45,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isVisible && toastRef.current) {
      // Clear existing timer
      if (timerRef.current) clearTimeout(timerRef.current);

      // Entrance animation
      gsap.fromTo(
        toastRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }
      );

      // Set timer to auto-close
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 4000);
    }
  }, [isVisible, palette, handleClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.toastContainer}>
      <div ref={toastRef} className={styles.toast}>
        <div className={styles.toastHeader}>
          <span className={styles.themeName}>{palette.name}</span>
        </div>
        <div className={styles.toastBody}>
          <div className={styles.swatches}>
            <div 
              className={styles.swatch} 
              style={{ background: palette.background }} 
              title="Background"
            />
            <div 
              className={styles.swatch} 
              style={{ background: palette.accent_1 }} 
              title="Accent 1"
            />
            <div 
              className={styles.swatch} 
              style={{ background: palette.accent_2 }} 
              title="Accent 2"
            />
          </div>
          <div className={styles.colorDetails}>
            <span className={styles.hexValue}>{palette.background}</span>
            <span className={styles.hexValue}>{palette.accent_1}</span>
            <span className={styles.hexValue}>{palette.accent_2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
