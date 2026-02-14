'use client';

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { InteractiveGrid } from "./InteractiveGrid";
import { FaceWireframeReveal } from "./faceWireframeReveal";
import { useTheme } from "./ThemeContext";


export default function FaceWireframeCanvas() {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { nextPalette } = useTheme();

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
      style={{ width: '100%', height: '100%', cursor: 'pointer', minHeight: 0, minWidth: 0 }}
      onClick={nextPalette}
    >
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
