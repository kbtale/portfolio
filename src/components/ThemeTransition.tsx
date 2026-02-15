"use client";

import React, { useImperativeHandle, useRef, forwardRef } from "react";
import gsap from "gsap";
import styles from "./ThemeTransition.module.css";

export interface ThemeTransitionHandle {
  play: (onMidpoint: () => void) => Promise<void>;
}

const ThemeTransition = forwardRef<ThemeTransitionHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useImperativeHandle(ref, () => ({
    play: async (onMidpoint: () => void) => {
      const layers = layersRef.current;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Restore scrollbar/scrolling
          window.lenis?.start();
          document.documentElement.classList.remove("hide-scrollbar");
        }
      });

      // Disable scrollbar/scrolling during transition via class & Lenis
      document.documentElement.classList.add("hide-scrollbar");
      window.lenis?.stop();

      // Reset transform origin for entrance
      gsap.set(layers, { transformOrigin: isMobile ? "top" : "left" });

      // Entrance
      tl.to(layers, {
        [isMobile ? "scaleY" : "scaleX"]: 1,
        duration: 0.45,
        ease: "power2.inOut",
        stagger: 0.08,
      });

      // Midpoint: Switch theme
      tl.add(() => {
        onMidpoint();
      });

      // Exit
      tl.to(layers, {
        [isMobile ? "scaleY" : "scaleX"]: 0,
        duration: 0.45,
        ease: "power2.inOut",
        stagger: {
          each: 0.08,
          from: "end",
        },
        transformOrigin: isMobile ? "bottom" : "right",
      });

      await tl.play();
      
      // Reset transform origin for next time
      gsap.set(layers, { transformOrigin: isMobile ? "top" : "left" });
    },
  }));

  return (
    <div ref={containerRef} className={styles.overlay}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={styles.layer}
          ref={(el) => {
            if (el) layersRef.current[i] = el;
          }}
        />
      ))}
    </div>
  );
});

ThemeTransition.displayName = "ThemeTransition";

export default ThemeTransition;
