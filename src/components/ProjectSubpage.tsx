import Link from './Link'
import { ArrowLeft, ExternalLink, Activity, Cpu, GitFork } from 'lucide-react'
import { Github } from './Icons'
import { ProjectItem } from '../data/projects'

export default function ProjectSubpage({
  project,
  onBack,
}: {
  project: ProjectItem
  onBack?: () => void
}) {
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Back Link */}
        <Link
          href="/#projects"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 hover:text-black transition-colors mb-10 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Overview</span>
        </Link>

        {/* Header */}
        <header className="border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200/80 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80 font-medium">
              Engineering Case Study
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 font-display">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 font-sans leading-relaxed">
            {project.tagline}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-2 rounded-lg font-mono font-medium text-xs transition-all shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 px-4 py-2 rounded-lg font-mono font-medium text-xs transition-all shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            )}
          </div>
        </header>

        {/* Narrative Overview */}
        {project.longDescription && (
          <section className="py-10 border-b border-zinc-200">
            <h2 className="text-xl font-bold font-display text-zinc-950 mb-3">
              Overview & Problem Space
            </h2>
            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              {project.longDescription}
            </p>
          </section>
        )}

        {/* Performance & Throughput Benchmarks */}
        {project.benchmarks && (
          <section className="py-10 border-b border-zinc-200">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-zinc-500" />
              <h2 className="text-xl font-bold font-display text-zinc-950">
                Performance & Latency Benchmarks
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.benchmarks.map((b) => (
                <div key={b.label} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm">
                  <div className="text-xs font-mono text-zinc-500">{b.label}</div>
                  <div className="text-base sm:text-lg font-mono font-bold text-zinc-950 mt-1.5">
                    {b.val}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* High-Level Architectural Flow */}
        {project.architectureDiagram && (
          <section className="py-10 border-b border-zinc-200">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-zinc-500" />
              <h2 className="text-xl font-bold font-display text-zinc-950">
                System Architecture
              </h2>
            </div>
            <p className="text-sm font-sans text-zinc-600 mb-6">
              {project.architectureDiagram.summary}
            </p>

            <div className="space-y-3">
              {project.architectureDiagram.flow.map((node) => (
                <div
                  key={node.step}
                  className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {node.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono font-bold text-zinc-950">
                      {node.component}
                    </div>
                    <div className="text-xs sm:text-sm font-sans text-zinc-600 mt-0.5">
                      {node.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* System Bottlenecks & Engineering Trade-Offs */}
        {project.tradeoffs && (
          <section className="py-10 border-b border-zinc-200">
            <div className="flex items-center gap-2 mb-4">
              <GitFork className="w-4 h-4 text-zinc-500" />
              <h2 className="text-xl font-bold font-display text-zinc-950">
                System Bottlenecks & Engineering Trade-Offs
              </h2>
            </div>

            <div className="space-y-4">
              {project.tradeoffs.map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-zinc-200 bg-white shadow-sm">
                  <h3 className="text-sm font-mono font-bold text-zinc-950 mb-1.5">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50/80 inline-block px-2.5 py-1 rounded-md border border-emerald-200/70 mb-3">
                    Decision: {item.decision}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-zinc-600 leading-relaxed">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Chips */}
        <section className="py-10 border-b border-zinc-200">
          <h2 className="text-xs font-mono font-semibold uppercase text-zinc-500 tracking-wider mb-3">
            Technologies & Tools Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs font-mono font-medium text-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Projects
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-2.5 rounded-lg font-mono font-medium text-xs transition-all shadow-sm"
          >
            Discuss This System With Me →
          </Link>
        </div>

      </div>
    </main>
  )
}
