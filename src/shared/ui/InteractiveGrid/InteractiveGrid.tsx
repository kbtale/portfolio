import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from "@/app/providers/ThemeContext";

// Vertex Shader: Large, smooth, rolling hills
const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  

  float bigWaveX = sin(pos.x * 0.5 + uTime * 0.2);
  float bigWaveY = cos(pos.y * 0.3 + uTime * 0.15);
  float baseElevation = bigWaveX * bigWaveY * 1.5; // High amplitude
  

  float detailWave = sin(pos.x * 2.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.5) * 0.2;
  

  float d = distance(uv, uMouse);
  float interaction = exp(-pow(d * 5.0, 2.0)) * 2.0; // Strong, sharper lift
  
  float elevation = baseElevation + detailWave + interaction;
  
  pos.z += elevation;
  vElevation = elevation;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {

    float gridLines = 60.0;
    float lineThickness = 0.015;
    
    vec2 gridUV = fract(vUv * gridLines);
    float lineX = smoothstep(0.5 - lineThickness, 0.5, abs(gridUV.x - 0.5));
    float lineY = smoothstep(0.5 - lineThickness, 0.5, abs(gridUV.y - 0.5));
    float grid = max(lineX, lineY);
    

    float distFromCenter = distance(vUv, vec2(0.5));
    float alphaFade = 1.0 - smoothstep(0.1, 0.5, distFromCenter);
    

    float elevationAlpha = smoothstep(-1.0, 2.0, vElevation);
    
    float finalAlpha = grid * alphaFade * (0.2 + elevationAlpha * 0.8);
    

    vec3 finalColor = uColor + vec3(0.08) * elevationAlpha;
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

export function InteractiveGrid() {
  const { currentPalette } = useTheme()
  const meshRef = useRef<THREE.Mesh>(null)
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uColor: { value: new THREE.Color(currentPalette.accent_1) }
      }
    })
  }, [currentPalette.accent_1])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = state.clock.getElapsedTime()
    mat.uniforms.uMouse.value.lerp(targetMouse.current, 0.05)
  })

  return (

    <mesh 
      ref={meshRef}
      position={[0, -2, -5]} 
      rotation={[-Math.PI / 3, 0, 0]}
      onPointerMove={(e) => {
        if (e.uv) {
          targetMouse.current.copy(e.uv)
        }
      }}
      material={material}
    >
      <planeGeometry args={[24, 24, 128, 128]} /> 
    </mesh>
  )
}
