import { Project } from '../data/projectsData'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function ProjectCard({
  project,
  onOpenModal,
}: {
  project: Project
  onOpenModal: (project: Project) => void
}) {
  return (
    <div className="border-2 border-black shadow-[6px_6px_0_#000] p-6 bg-white flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[10px_10px_0_#000] transition-all duration-200 relative group">
      <div>
        {/* Top Code & Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold bg-zinc-100 border border-black px-2 py-0.5">
            {project.code}
          </span>
          {project.metrics && (
            <span className="text-[11px] font-mono text-zinc-600 font-semibold">
              ✦ {project.metrics}
            </span>
          )}
        </div>

        {/* Project Thumbnail Preview */}
        {project.image && (
          <div className="border-2 border-black mb-4 overflow-hidden bg-zinc-100 relative h-44 group-hover:border-black">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-black font-display text-black tracking-tight leading-snug">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-700 mt-2 text-sm leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((t) => (
            <span
              key={t}
              className="border border-black px-2 py-1 text-xs font-mono bg-zinc-50 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 font-bold font-mono text-xs hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-y-0.5"
        >
          <span>VIEW SPEC</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000]"
              title="Launch Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000]"
              title="View Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
