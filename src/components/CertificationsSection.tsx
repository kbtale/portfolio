"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "next-intl";
import WhooshButton from "./WhooshButton";
import styles from "../app/page.module.css";
import CertificationsCanvas from "@/components/CertificationsCanvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CertificationsSectionProps {
  title: string;
  tagline: string;
}

export default function CertificationsSection({ title, tagline }: CertificationsSectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const locale = useLocale();

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
        },
        invalidateOnRefresh: true,
      });
    });

    // Small delay to ensure initial refresh after layout
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [locale]); // Recalibrate when language changes

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
          <CertificationsCanvas title={title} progress={progress} />
        </div>
        
        <div 
          className={styles.certCta} 
          style={{ 
            opacity: progress > 0.95 ? 1 : 0,
            pointerEvents: progress > 0.95 ? "auto" : "none" 
          }}
        >
          <p>{tagline}</p>
          <div className={styles.certCtaButtons}>
            <WhooshButton label="Credly" href="https://www.credly.com/users/carlos-bolivar.dcd997b6/" target="_blank" />
            <WhooshButton label="LinkedIn" href="https://www.linkedin.com/in/carlos-alejandro-bolivar" target="_blank" />
          </div>
        </div>
      </div>
    </div>
  );
}
