'use client';

import { useMemo, useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type FaceGLTF = GLTF & {
  nodes: {
    Head?: THREE.Mesh
    mesh_0?: THREE.Mesh
  }
}

export function FaceWireframeReveal() {
  const { nodes, scene } = useGLTF('/models/face3.glb') as FaceGLTF
  const groupRef = useRef<THREE.Group>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { size, camera } = useThree()
  const fillUniformsRef = useRef<{ start: { value: number }; end: { value: number } } | null>(null)
  const wireUniformsRef = useRef<{ start: { value: number }; end: { value: number } } | null>(null)
  const [boundsData, setBoundsData] = useState<{
    bounds: THREE.Box3
    sizeVec: THREE.Vector3
    centerVec: THREE.Vector3
  } | null>(null)
  const worldMatrixRef = useRef(new THREE.Matrix4())

  const orangeWireframe = new THREE.Color('#DC753C')
  const skinColor = new THREE.Color('#C47F5B')

  const clipPlane = useRef(new THREE.Plane(new THREE.Vector3(1, 0, 0), 0))
  const boundsRef = useRef<{ minX: number; maxX: number } | null>(null)
  const CLIP_PROGRESS = 0.70
  const CLIP_Y_ROTATION = -Math.PI / 180 * 15
  const CLIP_Z_ROTATION = -Math.PI / 180 * -33
  const clipProgressRef = useRef(CLIP_PROGRESS)

  useEffect(() => {
    const bounds = new THREE.Box3().setFromObject(scene)
    const minX = bounds.min.x
    const maxX = bounds.max.x
    boundsRef.current = { minX, maxX }
    const xPos = THREE.MathUtils.lerp(maxX, minX, CLIP_PROGRESS)
    clipPlane.current.constant = -xPos
    clipPlane.current.normal
      .set(1, 0, 0)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), CLIP_Y_ROTATION)
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), CLIP_Z_ROTATION)
  }, [scene])

  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.updateWorldMatrix(true, true)
    worldMatrixRef.current.copy(groupRef.current.matrixWorld)
    const bounds = new THREE.Box3().setFromObject(groupRef.current)
    const sizeVec = new THREE.Vector3()
    const centerVec = new THREE.Vector3()
    bounds.getSize(sizeVec)
    bounds.getCenter(centerVec)
    setBoundsData({ bounds, sizeVec, centerVec })
  }, [scene])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const width = window.innerWidth || size.width
      const height = window.innerHeight || size.height
      const x = (event.clientX / width) * 2 - 1
      const y = -(event.clientY / height) * 2 + 1
      pointerRef.current = { x, y }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [size.width, size.height])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.updateWorldMatrix(true, true)
    worldMatrixRef.current.copy(groupRef.current.matrixWorld)
    const { x, y } = pointerRef.current
    const centerWorld = effectiveBounds.centerVec.clone()
    const centerNdc = centerWorld.project(camera)
    const dx = x - centerNdc.x
    const dy = y - centerNdc.y
    const distance = Math.min(1, Math.hypot(dx, dy))
    const influence = 1 - distance
    const baseY = -Math.PI / 180 * 50
    const baseX = 0
    const maxYaw = Math.PI / 180 * 42
    const maxPitch = Math.PI / 180 * 36
    const targetY = baseY + x * maxYaw * influence
    const targetX = baseX + y * maxPitch * influence

    const rotEase = THREE.MathUtils.damp(0, 1, 2, delta)
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * rotEase
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * rotEase

    const bounds = boundsRef.current
    if (bounds) {
      const targetProgress = Math.min(33, CLIP_PROGRESS + 0.42 * influence)
      clipProgressRef.current = THREE.MathUtils.damp(
        clipProgressRef.current,
        targetProgress,
        6,
        delta
      )
      const xPos = THREE.MathUtils.lerp(bounds.maxX, bounds.minX, clipProgressRef.current)
      clipPlane.current.constant = -xPos
    }
  })

  const baseMesh = useMemo(() => {
    if (nodes.Head?.geometry || nodes.mesh_0?.geometry) {
      const mesh = (nodes.Head || nodes.mesh_0) as THREE.Mesh | undefined
      return mesh ?? null
    }
    let found: THREE.Mesh | null = null
    scene.traverse((child) => {
      if (found) return
      const mesh = child as THREE.Mesh
      if (mesh.isMesh && mesh.geometry) {
        found = mesh
      }
    })
    return found
  }, [nodes, scene])

  const sceneBoundsData = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(scene)
    const sizeVec = new THREE.Vector3()
    const centerVec = new THREE.Vector3()
    bounds.getSize(sizeVec)
    bounds.getCenter(centerVec)
    return { bounds, sizeVec, centerVec }
  }, [scene])

  const effectiveBounds = boundsData ?? sceneBoundsData

  const geometry = baseMesh?.geometry ?? null
  const edges = useMemo(() => {
    if (!geometry) return null
    return new THREE.EdgesGeometry(geometry, 1)
  }, [geometry])
  const fadeRange = useMemo(() => {
    const bounds = effectiveBounds.bounds
    const sizeVec = effectiveBounds.sizeVec
    const start = bounds.min.y + sizeVec.y * 0.21
    const end = bounds.min.y + sizeVec.y * 0.27
    const radius = Math.max(sizeVec.x, sizeVec.z) * 0.5 || 1
    const roundness = sizeVec.y * 0.18
    const center = effectiveBounds.centerVec.clone()
    return { start, end, radius, roundness, center }
  }, [effectiveBounds])
  const baseMaterial = baseMesh?.material ?? null

  const filledMaterial = useMemo(() => {
    if (!baseMaterial) return null
    const cloned = (Array.isArray(baseMaterial)
      ? baseMaterial[0]
      : baseMaterial
    ).clone() as THREE.Material
    if ("clippingPlanes" in cloned) {
      const standard = cloned as THREE.MeshStandardMaterial
      standard.clippingPlanes = [clipPlane.current]
      standard.side = THREE.DoubleSide
      standard.transparent = true
      standard.depthWrite = true
      standard.depthTest = true
      standard.polygonOffset = true
      standard.polygonOffsetFactor = -1
      standard.polygonOffsetUnits = -1

      standard.onBeforeCompile = (shader) => {
        shader.uniforms.uFadeStart = { value: fadeRange.start }
        shader.uniforms.uFadeEnd = { value: fadeRange.end }
        fillUniformsRef.current = {
          start: shader.uniforms.uFadeStart,
          end: shader.uniforms.uFadeEnd,
        }
        shader.uniforms.uFadeCenter = { value: fadeRange.center }
        shader.uniforms.uFadeRadius = { value: fadeRange.radius }
        shader.uniforms.uFadeRoundness = { value: fadeRange.roundness }
        shader.vertexShader = `varying vec3 vWorldPosition;\n${shader.vertexShader}`
        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          "#include <project_vertex>\n  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;"
        )
        shader.fragmentShader = `uniform float uFadeStart;\nuniform float uFadeEnd;\nuniform vec3 uFadeCenter;\nuniform float uFadeRadius;\nuniform float uFadeRoundness;\nvarying vec3 vWorldPosition;\n${shader.fragmentShader}`
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <opaque_fragment>",
          "#include <opaque_fragment>\n  vec2 dxz = vWorldPosition.xz - uFadeCenter.xz;\n  float radial = clamp(length(dxz) / uFadeRadius, 0.0, 1.0);\n  float curve = uFadeRoundness * (1.0 - radial);\n  float start = uFadeStart - curve;\n  float end = uFadeEnd - curve;\n  float fade = smoothstep(start, end, vWorldPosition.y);\n  gl_FragColor.a *= fade;\n  gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.4, gl_FragColor.rgb, fade);"
        )
      }
      standard.needsUpdate = true
    }
    return cloned
  }, [baseMaterial, fadeRange, clipPlane])

  const wireMaterial = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: orangeWireframe,
      depthWrite: false,
      transparent: true,
    })

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uFadeStart = { value: fadeRange.start }
      shader.uniforms.uFadeEnd = { value: fadeRange.end }
      wireUniformsRef.current = {
        start: shader.uniforms.uFadeStart,
        end: shader.uniforms.uFadeEnd,
      }
      shader.uniforms.uFadeCenter = { value: fadeRange.center }
      shader.uniforms.uFadeRadius = { value: fadeRange.radius }
      shader.uniforms.uFadeRoundness = { value: fadeRange.roundness }
      shader.vertexShader = `varying vec3 vWorldPosition;\n${shader.vertexShader}`
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\n  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;"
      )
      shader.fragmentShader = `uniform float uFadeStart;\nuniform float uFadeEnd;\nuniform vec3 uFadeCenter;\nuniform float uFadeRadius;\nuniform float uFadeRoundness;\nvarying vec3 vWorldPosition;\n${shader.fragmentShader}`
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        "#include <dithering_fragment>\n  vec2 dxz = vWorldPosition.xz - uFadeCenter.xz;\n  float radial = clamp(length(dxz) / uFadeRadius, 0.0, 1.0);\n  float curve = uFadeRoundness * (1.0 - radial);\n  float start = uFadeStart - curve;\n  float end = uFadeEnd - curve;\n  float fade = smoothstep(start, end, vWorldPosition.y);\n  gl_FragColor.a *= fade;"
      )
    }

    return material
  }, [fadeRange, orangeWireframe])

  if (!geometry || !edges) return null

  return (
    <group
      ref={groupRef}
      dispose={null}
      scale={0.75}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 180 * 50, 0]}
    >
      <lineSegments geometry={edges} material={wireMaterial} renderOrder={-1} />

      <mesh geometry={geometry} renderOrder={1}>
        {filledMaterial ? (
          <primitive object={filledMaterial} attach="material" />
        ) : (
          <meshStandardMaterial
            color={skinColor}
            roughness={0.5}
            metalness={0.1}
            clippingPlanes={[clipPlane.current]}
            side={THREE.DoubleSide}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        )}
      </mesh>

    </group>
  )
}

useGLTF.preload('/models/face3.glb')