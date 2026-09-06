import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { skills, Skill } from '../data/skillsData'
import { Cpu, Box } from 'lucide-react'
import { TechIcon } from './TechIcons'

// Compact, crisp icon node with distanceFactor=4.6 for clear legibility and non-overlapping spacing
function SkillIconNode({
  skill,
  isFiltered,
}: {
  skill: Skill
  isFiltered: boolean
}) {
  return (
    <group position={skill.pos}>
      {/* 3D anchor joint point on sphere */}
      <mesh>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={isFiltered ? skill.color : '#a1a1aa'} />
      </mesh>

      {/* HTML Overlay with distanceFactor=4.6 */}
      <Html center distanceFactor={4.6}>
        <div
          className={`transition-all duration-300 flex flex-col items-center select-none pointer-events-none ${
            isFiltered
              ? 'opacity-100 scale-100'
              : 'opacity-15 scale-75'
          }`}
        >
          {/* Circular Logo Badge */}
          <div
            className="w-5 h-5 rounded-full border border-black bg-white flex items-center justify-center shadow-[1px_1px_0px_#000] p-0.5"
            style={{ borderColor: isFiltered ? skill.color : '#000' }}
          >
            <TechIcon name={skill.name} className="w-3 h-3" />
          </div>

          {/* Mini Monospace Caption Underneath */}
          <span className="text-[7.5px] font-mono font-bold bg-black text-white px-1.5 py-[1px] border border-black shadow-[1px_1px_0px_#000] mt-[1px] whitespace-nowrap leading-tight">
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  )
}

// 3D Wireframe Icosahedron & Orbiting Nodes
function GlobeMesh({
  selectedCategory,
}: {
  selectedCategory: string
}) {
  const icoRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.03
    }
  })

  return (
    <group position={[0, 0.08, 0]}>
      {/* Wireframe Icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial wireframe color="#000000" transparent opacity={0.2} />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.65, 16, 16]} />
        <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.1} />
      </mesh>

      {/* Icon Nodes mapped on Fibonacci sphere */}
      {skills.map((skill) => {
        const isFiltered = selectedCategory === 'ALL' || skill.category === selectedCategory
        return (
          <SkillIconNode
            key={skill.name}
            skill={skill}
            isFiltered={isFiltered}
          />
        )
      })}
    </group>
  )
}

// Synchronized Plain Text Reference Data for STACK_REFERENCE Static Card
const techStackCategories = [
  {
    category: 'AI & Machine Learning',
    items: ['Python', 'LangChain', 'LangGraph', 'Vector DBs']
  },
  {
    category: 'Backend & Distributed Systems',
    items: ['Java', 'FastAPI', 'PostgreSQL', 'Redis', 'Microservices']
  },
  {
    category: 'Frontend & Web Technologies',
    items: ['TypeScript', 'JavaScript', 'React', 'Tailwind CSS']
  },
  {
    category: 'Developer Tooling & DevOps',
    items: ['Docker', 'Git', 'CI/CD']
  }
]

export default function SkillsGlobe() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const categories = ['ALL', 'AI & ML', 'Backend & Systems', 'Frontend & Web', 'DevOps & Tools']

  return (
    <section id="skills" className="py-20 bg-[#f7f7f8] border-b-2 border-black dot-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-xs font-mono font-bold mb-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>SKILLS_MATRIX_3D</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight font-display uppercase">
              TECHNICAL PROFICIENCIES
            </h2>
            <p className="text-zinc-700 text-sm sm:text-base font-mono mt-1">
              Interactive 3D icon sphere with Fibonacci distribution and static stack reference.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-bold border-2 transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-[#00f0ff] border-black shadow-[3px_3px_0px_#00f0ff]'
                    : 'bg-white text-black border-black shadow-[2px_2px_0px_#000] hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Primary 3D Icon Globe + Static Tech List Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Centered 3D Icon Globe Canvas with safe margin */}
          <div className="lg:col-span-7 bg-white border-2 border-black shadow-[8px_8px_0px_#000] relative h-[440px] sm:h-[500px] lg:h-auto min-h-[460px] overflow-hidden flex flex-col">
            {/* Viewport Top Bar */}
            <div className="bg-zinc-900 text-white px-4 py-2 border-b-2 border-black flex items-center justify-between text-xs font-mono z-10">
              <span className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>THREE.JS // ICON_SPHERE_3D</span>
              </span>
              <span className="text-[#00f0ff] font-bold">CLICK & DRAG TO SPIN</span>
            </div>

            {/* R3F Canvas */}
            <div className="flex-1 relative cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 5.3], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={1.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -5, -3]} intensity={0.6} />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.8}
                  enablePan={false}
                />
                <GlobeMesh
                  selectedCategory={selectedCategory}
                />
              </Canvas>

              {/* Bottom Floating Legend */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border-2 border-black px-3.5 py-1 text-xs font-mono flex items-center gap-2 shadow-[2px_2px_0px_#000] whitespace-nowrap pointer-events-none z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Active Nodes: {skills.filter(s => selectedCategory === 'ALL' || s.category === selectedCategory).length} of {skills.length}</span>
              </div>
            </div>
          </div>

          {/* Right Column: ONE Static Tech Stack Reference Card (Passive Plain Text) */}
          <div className="lg:col-span-5 bg-white border-2 border-black p-6 sm:p-7 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
                <span className="text-xs font-mono font-bold bg-black text-white px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                  STACK_REFERENCE
                </span>
                <span className="text-xs font-mono text-zinc-500 font-semibold">
                  PASSIVE INDEX
                </span>
              </div>

              {/* Categorized Plain Text Stack */}
              <div className="space-y-5">
                {techStackCategories.map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#00f0ff] border border-black inline-block" />
                      <span>{group.category}</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pl-3 border-l-2 border-zinc-200">
                      {group.items.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-block text-xs font-mono text-zinc-800 bg-zinc-50 border border-zinc-300 px-2 py-0.5 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card Summary Note */}
            <div className="mt-6 pt-4 border-t-2 border-black text-[11px] font-mono text-zinc-600 flex items-center justify-between">
              <span>● Production Toolchain</span>
              <span className="text-black font-bold">2026 STACK</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
