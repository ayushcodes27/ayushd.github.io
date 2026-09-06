import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Procedural Robotic Mascot with high-fidelity mechanical details & glowing visor
function CyberMascot() {
  const robotGroup = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const ringRef1 = useRef<THREE.Mesh>(null)
  const ringRef2 = useRef<THREE.Mesh>(null)
  const antennaRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // Smooth subtle breathing & rotational hover
    if (robotGroup.current) {
      robotGroup.current.position.y = Math.sin(t * 1.5) * 0.12
    }

    // Interactive slight head track
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.15
      headRef.current.rotation.x = Math.cos(t * 1.2) * 0.08
    }

    // Floating gyro reactor rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.8
      ringRef1.current.rotation.y += delta * 0.5
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.6
      ringRef2.current.rotation.z += delta * 0.4
    }

    // Glowing antenna pulse
    if (antennaRef.current) {
      const s = 1 + Math.sin(t * 4) * 0.2
      antennaRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group ref={robotGroup} position={[0, -0.1, 0]} scale={0.78}>
      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 0.9, 0]}>
        {/* Main Helmet (Glossy Stark White / Dark Neo-brutalist) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1.2, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.42, 1.22, 1.22]} />
          <meshBasicMaterial wireframe color="#000000" />
        </mesh>

        {/* Visor Screen (Deep Cyber Black with Glow) */}
        <mesh position={[0, 0.05, 0.58]}>
          <boxGeometry args={[1.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Neon Eyes (Cyan Cyber Glow) */}
        <mesh ref={leftEyeRef} position={[-0.28, 0.05, 0.64]}>
          <planeGeometry args={[0.22, 0.12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.28, 0.05, 0.64]}>
          <planeGeometry args={[0.22, 0.12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Cyber Headphones / Side Pods */}
        <mesh position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Antenna Mast */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Pulsing Beacon Light */}
        <mesh ref={antennaRef} position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* --- NECK & CORE JOINT --- */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* --- TORSO & CHEST ARMOR --- */}
      <group position={[0, -0.6, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 1.2, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.32, 1.22, 0.92]} />
          <meshBasicMaterial wireframe color="#000000" />
        </mesh>

        {/* Chest Core Reactor (Pulsing Cyber Emerald / Lime / Cyan) */}
        <mesh position={[0, 0.15, 0.47]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.15, 0.46]}>
          <ringGeometry args={[0.24, 0.28, 24]} />
          <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
        </mesh>

        {/* Tech Badges on chest */}
        <mesh position={[-0.35, -0.25, 0.47]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.35, -0.38, 0.47]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* --- FLOATING HOLOGRAPHIC GYRO RINGS --- */}
      <mesh ref={ringRef1} position={[0, -0.5, 0]}>
        <torusGeometry args={[1.25, 0.02, 16, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={ringRef2} position={[0, -0.5, 0]}>
        <torusGeometry args={[1.45, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* --- FLOATING HAND PODS --- */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[-1.2, -0.6, 0.2]}>
          <mesh>
            <sphereGeometry args={[0.24, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial wireframe color="#000000" />
          </mesh>
        </group>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[1.2, -0.6, 0.2]}>
          <mesh>
            <sphereGeometry args={[0.24, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial wireframe color="#000000" />
          </mesh>
        </group>
      </Float>

      {/* Ground Cyber Shadow */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

export default function Scene3DHero() {
  return (
    <div className="w-full h-[380px] sm:h-[440px] md:h-[480px] relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.4} />
        <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#00f0ff" />

        {/* Presentation controls for interactive rotation & drag */}
        <PresentationControls
          global
          rotation={[0, 0.35, 0]}
          polar={[-0.25, 0.25]}
          azimuth={[-0.8, 0.8]}
          speed={1.5}
          zoom={1}
        >
          <CyberMascot />
        </PresentationControls>
      </Canvas>

      {/* Interactive Helper Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border-2 border-black px-3 py-1 text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] pointer-events-none whitespace-nowrap">
        ✦ DRAG TO ROTATE 3D MASCOT
      </div>
    </div>
  )
}
