"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Palette } from "./ThemeContext";
import styles from "./ThemeToast.module.css";

interface ThemeToastProps {
  palette: Palette;
  isVisible: boolean;
  type: "theme" | "message";
  message?: string;
  onClose: () => void;
}

export default function ThemeToast({ palette, isVisible, type, message, onClose }: ThemeToastProps) {
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
      if (timerRef.current) clearTimeout(timerRef.current);

      gsap.fromTo(
        toastRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" }
      );

      timerRef.current = setTimeout(() => {
        handleClose();
      }, type === "message" ? 6000 : 4000);
    }
  }, [isVisible, palette, handleClose, type]);

  if (!isVisible) return null;

  const renderMessage = (msg: string) => {
    const parts = msg.split(/(<link>.*?<\/link>)/g);
    return parts.map((part, i) => {
      if (part.startsWith("<link>") && part.endsWith("</link>")) {
        const text = part.replace("<link>", "").replace("</link>", "");
        return (
          <a key={i} href="https://github.com/kbtale" target="_blank" rel="noopener noreferrer" className={styles.toastLink}>
            {text}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={styles.toastContainer}>
      <div ref={toastRef} className={styles.toast}>
        {type === "theme" ? (
          <>
            <div className={styles.toastHeader}>
              <span className={styles.themeName}>{palette.name}</span>
            </div>
            <div className={styles.toastBody}>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <div className={styles.swatch} style={{ background: palette.background }} />
                  <span className={styles.hexValue}>{palette.background}</span>
                </div>
                <div className={styles.gridItem}>
                  <div className={styles.swatch} style={{ background: palette.text }} />
                  <span className={styles.hexValue}>{palette.text}</span>
                </div>
                <div className={styles.gridItem}>
                  <div className={styles.swatch} style={{ background: palette.accent_1 }} />
                  <span className={styles.hexValue}>{palette.accent_1}</span>
                </div>
                <div className={styles.gridItem}>
                  <div className={styles.swatch} style={{ background: palette.accent_2 }} />
                  <span className={styles.hexValue}>{palette.accent_2}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.messageBody}>
            {message ? renderMessage(message) : ""}
          </div>
        )}
      </div>
    </div>
  );
}
