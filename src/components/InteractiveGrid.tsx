
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Vertex Shader: Large, smooth, rolling hills
const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Large Rolling Wave (Low Frequency, High Amplitude)
  float bigWaveX = sin(pos.x * 0.5 + uTime * 0.2);
  float bigWaveY = cos(pos.y * 0.3 + uTime * 0.15);
  float baseElevation = bigWaveX * bigWaveY * 1.5; // High amplitude
  
  // Secondary detail wave
  float detailWave = sin(pos.x * 2.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.5) * 0.2;
  
  // Interactive Swell (Mouse Interaction via UV)
  float d = distance(uv, uMouse);
  float interaction = exp(-pow(d * 5.0, 2.0)) * 2.0; // Strong, sharper lift
  
  float elevation = baseElevation + detailWave + interaction;
  
  pos.z += elevation;
  vElevation = elevation;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

// Fragment Shader: High-density, fine grid
const fragmentShader = `
uniform vec3 uColor;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Grid Settings
  float gridLines = 60.0;
  float lineThickness = 0.015;
  
  vec2 gridUV = fract(vUv * gridLines);
  float lineX = smoothstep(0.5 - lineThickness, 0.5, abs(gridUV.x - 0.5));
  float lineY = smoothstep(0.5 - lineThickness, 0.5, abs(gridUV.y - 0.5));
  float grid = max(lineX, lineY);
  
  // Circular Vignette Fade
  float distFromCenter = distance(vUv, vec2(0.5));
  float alphaFade = 1.0 - smoothstep(0.1, 0.5, distFromCenter);
  
  // Height based opacity
  float elevationAlpha = smoothstep(-1.0, 2.0, vElevation);
  
  float finalAlpha = grid * alphaFade * (0.2 + elevationAlpha * 0.8);
  
  // Color modulation
  vec3 finalColor = uColor + vec3(0.1, 0.05, 0.0) * elevationAlpha;
  
  gl_FragColor = vec4(finalColor, finalAlpha);
}
`

export function InteractiveGrid() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor: { value: new THREE.Color('#DC753C') } 
  }), [])

  // Use a ref to store target UV for smooth interpolation
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    
    // Smoothly interpolate current uMouse to targetMouse
    materialRef.current.uniforms.uMouse.value.lerp(targetMouse.current, 0.05)
  })

  return (
    // Tilted plane behind head
    <mesh 
      position={[0, -2, -5]} 
      rotation={[-Math.PI / 3, 0, 0]}
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.copy(e.uv)
        }
      }}
    >
      <planeGeometry args={[24, 24, 128, 128]} /> 
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
