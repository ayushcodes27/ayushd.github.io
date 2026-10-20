import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, projects } from '../data/projectsData'
import { ArrowUpRight, GitBranch, Layers, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons'
import { playSound } from '../utils/sound'

export default function ProjectsTableHover({
  onSelectProject,
}: {
  onSelectProject: (p: Project) => void
}) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(projects[0])

  return (
    <div className="mt-20 pt-12 border-t-2 border-black relative">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
            ( Architecture & System Index )
          </span>
          <h3 className="text-3xl sm:text-4xl font-black font-display text-black uppercase tracking-tight">
            DEEP-DIVE <span className="font-serif italic font-normal lowercase">repository</span> SPECIFICATIONS
          </h3>
        </div>
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>HOVER ROW TO PREVIEW SYSTEM</span>
        </div>
      </div>

      {/* Main Grid: Left Interactive List, Right Floating Preview Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Numbered Editorial List */}
        <div className="lg:col-span-7 divide-y-2 divide-black border-y-2 border-black bg-white shadow-[6px_6px_0px_#000]">
          {projects.map((item, index) => {
            const isHovered = hoveredProject?.id === item.id
            const num = String(index + 1).padStart(2, '0')

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredProject(item)
                  playSound('hover')
                }}
                onClick={() => {
                  playSound('click')
                  onSelectProject(item)
                }}
                className={`p-4 sm:p-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                  isHovered ? 'bg-black text-white' : 'bg-white text-black hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Number Badge */}
                  <span className={`font-mono text-xs font-bold transition-colors ${
                    isHovered ? 'text-[#00f0ff]' : 'text-zinc-400'
                  }`}>
                    {num}.
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-black text-lg sm:text-xl tracking-tight uppercase leading-snug">
                        {item.title}
                      </h4>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                        isHovered 
                          ? 'border-[#00f0ff] text-[#00f0ff] bg-black' 
                          : 'border-black text-black bg-zinc-100'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <p className={`text-xs mt-1 font-sans line-clamp-1 ${
                      isHovered ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Right Arrow / Action Pill */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <div className={`p-2 border transition-all ${
                    isHovered 
                      ? 'border-[#00f0ff] bg-[#00f0ff] text-black shadow-[2px_2px_0px_#fff]' 
                      : 'border-black bg-white text-black shadow-[2px_2px_0px_#000]'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Sticky Live Floating Preview Stage */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white border-2 border-black p-5 shadow-[8px_8px_0px_#000] min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hoveredProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                      <span className="text-xs font-mono font-bold text-black flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span>LIVE_SYSTEM_PREVIEW</span>
                      </span>
                      <span className="text-xs font-mono font-bold bg-black text-white px-2 py-0.5">
                        {hoveredProject.category}
                      </span>
                    </div>

                    {/* Architectural Preview Box */}
                    <div className="border-2 border-black overflow-hidden h-44 bg-zinc-950 p-4 mb-4 shadow-[3px_3px_0px_#000] relative flex flex-col justify-between text-white font-mono">
                      <div className="text-xs text-zinc-400">
                        {hoveredProject.tags.join(' • ')}
                      </div>
                      <div className="text-lg font-bold text-[#00f0ff]">
                        {hoveredProject.title}
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        {hoveredProject.tagline}
                      </div>
                    </div>

                    {/* Project Title */}
                    <h4 className="font-display font-black text-xl text-black leading-snug mb-2">
                      {hoveredProject.title}
                    </h4>

                    {/* Architectural Highlight */}
                    <p className="text-xs text-zinc-700 font-sans leading-relaxed mb-4 line-clamp-3">
                      {hoveredProject.longDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {hoveredProject.tags.slice(0, 5).map((t: string) => (
                        <span
                          key={t}
                          className="border border-black px-2 py-0.5 text-[11px] font-mono bg-zinc-50 font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t-2 border-black flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        playSound('click')
                        onSelectProject(hoveredProject)
                      }}
                      className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-800 transition"
                    >
                      <span>INSPECT SPEC</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {hoveredProject.githubUrl && (
                      <a
                        href={hoveredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound('click')}
                        className="inline-flex items-center gap-1.5 bg-white text-black px-4 py-2 font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-100 transition"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>SOURCE</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}
