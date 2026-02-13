"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificationsCanvas from "@/components/CertificationsCanvas";
import WhooshButton from "./WhooshButton";
import styles from "../app/page.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CertificationsSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top bottom",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      invalidateOnRefresh: true,
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      st.kill();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      ref={triggerRef} 
      className={styles.certScrollTrigger} 
      style={{ height: "300vh" }}
      id="certifications"
      data-section="certifications"
    >
      <div className={styles.certStickyWrapper}>
        <div className={styles.certCanvasContainer}>
          <CertificationsCanvas progress={progress} />
        </div>
        
        <div 
          className={styles.certCta} 
          style={{ 
            opacity: progress > 0.95 ? 1 : 0,
            pointerEvents: progress > 0.95 ? "auto" : "none" 
          }}
        >
          <p>
            Want to see all my certifications? Check my Credly and LinkedIn profiles.
          </p>
          <div className={styles.certCtaButtons}>
            <WhooshButton label="Credly" href="https://www.credly.com/users/carlos-bolivar.dcd997b6/" target="_blank" />
            <WhooshButton label="LinkedIn" href="https://www.linkedin.com/in/carlos-alejandro-bolivar" target="_blank" />
          </div>
        </div>
      </div>
    </div>
  );
}
