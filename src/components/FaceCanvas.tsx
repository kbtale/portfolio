'use client';

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bounds, Center, Preload, useBounds, useGLTF } from "@react-three/drei";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { MeshoptDecoder } from "meshoptimizer";
import { Box3, Vector3 } from "three";
import type { Group, Material, Mesh } from "three";

const MODEL_PATH = "/models/face3.glb";
const DRACO_PATH = "/draco/";

const extendGLTFLoader = (loader: GLTFLoader) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(DRACO_PATH);
  loader.setDRACOLoader(dracoLoader);
  loader.setMeshoptDecoder(MeshoptDecoder);
};

useGLTF.preload(MODEL_PATH, true, true, extendGLTFLoader);

function FaceModel() {
  const { scene } = useGLTF(MODEL_PATH, true, true, extendGLTFLoader);
  const groupRef = useRef<Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const bounds = new Box3().setFromObject(scene);
    const sizeVec = new Vector3();
    const centerVec = new Vector3();
    bounds.getSize(sizeVec);
    bounds.getCenter(centerVec);
    const fadeStart = bounds.min.y + sizeVec.y * 0.09;
    const fadeEnd = fadeStart + sizeVec.y * 0.12;
    const radius = Math.max(sizeVec.x, sizeVec.z) * 0.5 || 1;
    const roundness = sizeVec.y * 0.09;

    type ShaderLike = {
      uniforms: Record<string, { value: unknown }>;
      vertexShader: string;
      fragmentShader: string;
    };

    const applyFade = (material: Material) => {
      const cloned = material.clone();
      cloned.transparent = true;
      cloned.onBeforeCompile = (shader: ShaderLike) => {
        shader.uniforms.uFadeStart = { value: fadeStart };
        shader.uniforms.uFadeEnd = { value: fadeEnd };
        shader.uniforms.uFadeCenter = { value: centerVec.clone() };
        shader.uniforms.uFadeRadius = { value: radius };
        shader.uniforms.uFadeRoundness = { value: roundness };
        shader.vertexShader = `varying vec3 vWorldPosition;\n${shader.vertexShader}`;
        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          "#include <project_vertex>\n  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;"
        );
        shader.fragmentShader = `uniform float uFadeStart;\nuniform float uFadeEnd;\nuniform vec3 uFadeCenter;\nuniform float uFadeRadius;\nuniform float uFadeRoundness;\nvarying vec3 vWorldPosition;\n${shader.fragmentShader}`;
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <opaque_fragment>",
          "#include <opaque_fragment>\n  vec2 dxz = vWorldPosition.xz - uFadeCenter.xz;\n  float radial = clamp(length(dxz) / uFadeRadius, 0.0, 1.0);\n  float curve = uFadeRoundness * (1.0 - radial);\n  float start = uFadeStart - curve;\n  float end = uFadeEnd - curve;\n  float fade = smoothstep(start, end, vWorldPosition.y);\n  gl_FragColor.a *= fade;"
        );
      };
      cloned.needsUpdate = true;
      return cloned;
    };

    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((mat) => applyFade(mat));
      } else {
        mesh.material = applyFade(mesh.material);
      }
    });
  }, [scene]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || size.width;
      const height = window.innerHeight || size.height;
      const x = (event.clientX / width) * 2 - 1;
      const y = -(event.clientY / height) * 2 + 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size.width, size.height]);

  useFrame(() => {
    if (!groupRef.current) return;
    const { x, y } = pointerRef.current;
    const distance = Math.min(1, Math.hypot(x, y));
    const influence = 1 - distance;
    const baseY = -Math.PI / 180 * 65;
    const baseX = 0;
    const maxYaw = Math.PI / 180 * 12;
    const maxPitch = Math.PI / 180 * 9;
    const targetY = baseY + x * maxYaw * influence;
    const targetX = baseX + y * maxPitch * influence;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.12;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.12;
  });

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 180 * 50, 0]} scale={2.1}>
      <primitive object={scene} />
    </group>
  );
}

function FitModelToView() {
  const bounds = useBounds();

  useEffect(() => {
    bounds.refresh().fit();
  }, [bounds]);

  return null;
}

export default function FaceCanvas() {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 2.5], fov: 45 }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, 2]} intensity={0.6} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={0.95}>
          <FitModelToView />
          <Center>
            <FaceModel />
          </Center>
        </Bounds>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
