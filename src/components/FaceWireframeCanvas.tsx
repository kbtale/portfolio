'use client';

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FaceWireframeReveal } from "./faceWireframeReveal";

export default function FaceWireframeCanvas() {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}
      camera={{ position: [0, 0, 2.5], fov: 45 }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, 2]} intensity={0.6} />
      <Suspense fallback={null}>
        <FaceWireframeReveal />
      </Suspense>
    </Canvas>
  );
}
