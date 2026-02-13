"use client";

import { useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeContext";

function GridPlane() {
  const { currentPalette } = useTheme();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        lineColor: { value: new THREE.Color(currentPalette.accent_1) },
        gridSize: { value: 1.4 },
        lineWidth: { value: 1.0 },
        gridDepth: { value: 30.0 },
        fadeStart: { value: 0.6 },
        fadeEnd: { value: 0.75 },
      },
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xyz;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 lineColor;
        uniform float gridSize;
        uniform float lineWidth;
        uniform float gridDepth;
        uniform float fadeStart;
        uniform float fadeEnd;
        varying vec3 vWorld;

        float gridLine(vec2 coord) {
          vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
          float line = min(grid.x, grid.y);
          return 1.0 - smoothstep(0.0, lineWidth, line);
        }

        void main() {
          vec2 coord = vWorld.xz / gridSize;
          float line = gridLine(coord);
          float zDepth = clamp(max(0.0, -vWorld.z) / gridDepth, 0.0, 1.0);
          float fade = 1.0 - smoothstep(fadeStart, fadeEnd, zDepth);
          float alpha = line * fade;
          gl_FragColor = vec4(lineColor, alpha);
        }
      `,
    });
  }, [currentPalette.accent_1]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} material={material}>
      <planeGeometry args={[60, 60, 1, 1]} />
    </mesh>
  );
}

export default function WireframeGridCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 6, 8], fov: 45, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true }}
      frameloop="demand"
    >
      <ambientLight intensity={0.6} />
      <GridPlane />
    </Canvas>
  );
}
