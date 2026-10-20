import Link from './Link'
import { ArrowUpRight } from 'lucide-react'
import { Github } from './Icons'
import { ProjectItem } from '../data/projects'

export default function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group relative rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-sm flex flex-col justify-between">
      {/* Primary Clickable Area for the Subpage */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black font-display">
              {project.title}
            </h3>
          </div>
          
          <div className="rounded-full p-1.5 text-zinc-400 transition-all group-hover:bg-zinc-100 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        {/* 1-Line Minimal Summary */}
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 line-clamp-2 font-sans">
          {project.tagline}
        </p>
      </Link>

      {/* Tech Stack & External Links Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-mono font-medium text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-zinc-400 hover:text-black transition-colors"
          title="Source Code"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
