import { useState } from 'react'
import { projects, Project } from '../data/projectsData'
import ProjectCard from './ProjectCard'
import { FolderGit2, X, ExternalLink } from 'lucide-react'
import { GithubIcon } from './Icons'

// Feature Flag: 3D Arcade banner currently hidden while in development
const SHOW_ARCADE_BANNER = false

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filterTag, setFilterTag] = useState<string>('ALL')

  const allTags = ['ALL', 'Java', 'Python', 'FastAPI', 'LangChain', 'Spring Boot', 'Kafka', 'Redis']

  // Show the 3 definitive featured projects
  const visibleProjects = projects.slice(0, 3)

  const filteredProjects = visibleProjects.filter((p) => {
    if (filterTag === 'ALL') return true
    return p.tags.includes(filterTag)
  })

  return (
    <section id="projects" className="py-20 bg-white border-b-2 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-xs font-mono font-bold mb-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <FolderGit2 className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>INDEXED_REPOSITORIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight font-display uppercase">
              FEATURED SYSTEMS & WORK
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-mono mt-1">
              Real-time bot mitigation engines, grounded clinical assistants, and distributed financial ledgers.
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1 text-xs font-mono font-bold border-2 transition-all ${
                  filterTag === tag
                    ? 'bg-black text-[#00f0ff] border-black shadow-[3px_3px_0px_#00f0ff]'
                    : 'bg-white text-black border-black shadow-[2px_2px_0px_#000] hover:bg-zinc-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Grid (Exactly 3 cards rendered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {/* 3D Arcade Section (Commented out / Feature-flagged off for now) */}
        {SHOW_ARCADE_BANNER && (
          <div className="mt-14 border-2 border-black p-8 bg-[#0a0a0a] text-white shadow-[8px_8px_0px_#000] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 bg-[#00f0ff] text-black px-2.5 py-0.5 text-xs font-mono font-bold mb-3 border border-black">
                  🏎️ 3D ARCADE — IN DEVELOPMENT
                </div>
                <h3 className="text-3xl font-black font-display tracking-tight text-white mb-2">
                  3D ARCADE & PHYSICS PLAYGROUND
                </h3>
                <p className="text-zinc-300 text-sm font-sans max-w-2xl leading-relaxed">
                  Interactive 3D vehicle world with real-time rigid body physics, ramps, and arcade stations. Built with Three.js and Cannon.js (Under active development).
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Project Modal Inspector */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white border-3 border-black max-w-2xl w-full shadow-[12px_12px_0px_#000] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold bg-black text-white px-2 py-0.5">
                {selectedProject.code}
              </span>
              {selectedProject.metrics && (
                <span className="text-xs font-mono text-zinc-600 font-bold">
                  {selectedProject.metrics}
                </span>
              )}
            </div>

            <h3 className="text-3xl font-black font-display text-black mb-4">
              {selectedProject.name}
            </h3>

            {selectedProject.image && (
              <div className="border-2 border-black mb-5 h-64 overflow-hidden bg-zinc-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 mb-2">
                Architecture & Implementation:
              </h4>
              <p className="text-zinc-800 text-sm sm:text-base leading-relaxed font-sans">
                {selectedProject.longDescription}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 mb-2">
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="border-2 border-black px-2.5 py-1 text-xs font-mono bg-zinc-100 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-4 border-t-2 border-black">
              {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-800 transition"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-100 transition"
                >
                  <span>SOURCE CODE</span>
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
