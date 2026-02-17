'use client';

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { InteractiveGrid } from "@/shared/ui/InteractiveGrid/InteractiveGrid";
import { FaceWireframeReveal } from "@/shared/ui/canvas/faceWireframeReveal";
import { useTheme } from "@/app/providers/ThemeContext";
import styles from "./FaceWireframeCanvas.module.css";


export default function FaceWireframeCanvas() {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { nextPalette, currentPalette } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.container}
      style={{ width: '100%', height: '100%', cursor: 'pointer', minHeight: 0, minWidth: 0, position: 'relative' }}
      onClick={nextPalette}
    >
      <div className={styles.indicatorWrapper}>
        <div className={styles.paletteName}>
          {currentPalette.name}
        </div>
        <div className={styles.swatches}>
          <div className={styles.swatch} style={{ backgroundColor: currentPalette.background }} />
          <div className={styles.swatch} style={{ backgroundColor: currentPalette.accent_1 }} />
          <div className={styles.swatch} style={{ backgroundColor: currentPalette.accent_2 }} />
          <div className={styles.swatch} style={{ backgroundColor: currentPalette.sub_neutral }} />
          <div className={styles.swatch} style={{ backgroundColor: currentPalette.text }} />
        </div>
      </div>
      <Canvas
        frameloop={isInView ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}
        camera={{ position: [0, 0, 2.5], fov: 45 }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 3, 3]} intensity={1.4} />
        <directionalLight position={[-3, 2, 2]} intensity={0.6} />
        <Suspense fallback={null}>
          <InteractiveGrid />
          <FaceWireframeReveal />
        </Suspense>
      </Canvas>
    </div>
  );
}
