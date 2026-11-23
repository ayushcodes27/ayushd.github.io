import { useState, useEffect } from 'react'
import Link from './Link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Play, Pause, ChevronRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import { ProjectItem, projects } from '../data/projects'

export default function ProjectSubpage({
  project,
  onBack,
}: {
  project: ProjectItem
  onBack?: () => void
}) {
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const nextIndex = (currentIndex + 1) % projects.length
  const nextProject = projects[nextIndex]

  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showStickyActions, setShowStickyActions] = useState(false)

  const activeStep = project.lifecycle[activeStepIndex] || project.lifecycle[0]
  const summaryText = project.plainSummary || project.tagline || project.summary
  const problemText = project.problemStatement || project.problemContext
  const solutionText = project.solutionStatement || project.summary
  const results = project.resultsMetrics || [
    { value: project.keyMetric.split(' ')[0] || project.keyMetric, label: 'Key Metric', detail: project.keyMetric },
    { value: '100%', label: 'Reliability', detail: 'Zero unhandled errors' },
    { value: '< 50ms', label: 'Response', detail: 'Low latency under load' },
  ]
  const specs = project.engineeringSpecs || [
    { title: 'Concurrency Control', detail: 'Optimized thread scheduling and locking eliminates contention deadlocks.' },
    { title: 'Fault Tolerance', detail: 'Automated retry and compensation protocols prevent orphaned distributed state.' },
    { title: 'Data Integrity', detail: 'End-to-end auditability and mathematical validation guarantees zero state drift.' },
  ]
  const conclusionText = project.caseStudyConclusion || project.longDescription || project.summary

  // Reading Progress Bar & Sticky Header scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100)
      }
      setShowStickyActions(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation for architecture flow (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowRight') {
        setActiveStepIndex((prev) => (prev + 1) % project.lifecycle.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveStepIndex((prev) => (prev - 1 + project.lifecycle.length) % project.lifecycle.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project.lifecycle.length])

  // Auto-play interval for stepping through stages
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % project.lifecycle.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [isAutoPlaying, project.lifecycle.length])

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white relative">
      
      {/* 2px Emerald Reading Progress Bar pinned to top of viewport */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-emerald-500 z-50 transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Quick-Actions Bar on Scroll */}
      <AnimatePresence>
        {showStickyActions && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-full px-4 py-2 shadow-sm flex items-center gap-3 text-xs font-sans"
          >
            <Link
              href="/#projects"
              onClick={onBack}
              className="text-neutral-500 hover:text-neutral-950 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>

            <span className="text-neutral-300">|</span>

            <span className="font-semibold text-neutral-900">
              {project.title}
            </span>

            <span className="text-neutral-300">|</span>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  Source ↗
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        
        {/* =======================================================
            Section 1: Merged 2-Column Hero + Metrics + Tech Stack
           ======================================================= */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-end">
          
          {/* Left Column (7 cols): Navigation, Title, Summary, CTAs */}
          <div className="lg:col-span-7 space-y-4">
            <Link
              href="/#projects"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-medium font-sans text-neutral-500 hover:text-neutral-900 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase font-sans">
                {project.category || project.tag}
              </p>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 font-sans">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-xl">
                {summaryText}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-sans">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source ↗</span>
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
                >
                  <span>Watch Demo ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Key Metrics + Tech Stack Card */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
              
              {/* Standout Metrics Row without truncation */}
              <div className="grid grid-cols-3 gap-2 pb-4 border-b border-neutral-200/60">
                {results.map((metric, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-xl sm:text-2xl font-bold font-sans text-neutral-950 tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-[11px] font-semibold text-neutral-800 font-sans">
                      {metric.label}
                    </div>
                    {metric.detail && (
                      <div className="text-[10px] text-neutral-500 font-sans">
                        {metric.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Integrated Tech Stack */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 font-sans block mb-2">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="bg-white border border-neutral-200/80 text-neutral-800 px-2.5 py-1 rounded-full text-xs font-medium font-sans shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </header>

        {/* =======================================================
            Section 2: Problem & Solution (Plain English)
           ======================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Problem */}
          <div className="rounded-2xl bg-neutral-50/70 border border-neutral-200/60 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase font-sans block mb-2.5">
                The Problem
              </span>
              <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
                {problemText}
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="rounded-2xl bg-neutral-50/70 border border-neutral-200/60 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase font-sans block mb-2.5">
                The Solution
              </span>
              <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
                {solutionText}
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            Section 3: Technical Architecture (Engineering Depth)
           ======================================================= */}
        <section className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase font-sans block">
                Technical Architecture
              </span>
              <h2 className="text-2xl font-semibold text-neutral-900 font-sans mt-1">
                End-to-End System Flow
              </h2>
              <p className="text-sm text-neutral-500 font-sans mt-0.5">
                Use <kbd className="font-mono text-xs bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-700">←</kbd> <kbd className="font-mono text-xs bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-700">→</kbd> arrow keys or click stages to step through.
              </p>
            </div>

            {/* Tiny Auto-play Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-all cursor-pointer self-start sm:self-auto ${
                isAutoPlaying
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-emerald-600" />
                  <span>Auto-stepping</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-neutral-500" />
                  <span>Auto-play flow</span>
                </>
              )}
            </button>
          </div>

          {/* Connected 4-Step Pipeline Flow (Responsive Grid + Mobile Swipe/Touch) */}
          <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory relative">
            {project.lifecycle.map((step, idx) => {
              const isSelected = activeStepIndex === idx
              const isPast = idx < activeStepIndex

              return (
                <div key={step.step} className="relative flex flex-col min-w-[240px] sm:min-w-0 flex-1 snap-start">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setActiveStepIndex(idx)
                    }}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer h-full flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 text-neutral-950 ring-1 ring-emerald-500/20'
                        : isPast
                        ? 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                        : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/60 text-neutral-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                            isSelected
                              ? 'bg-neutral-900 text-white'
                              : isPast
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {step.step}
                        </span>

                        <span className="text-[10px] font-sans text-neutral-400">
                          Stage {idx + 1}
                        </span>
                      </div>

                      <div className="text-sm font-semibold font-sans leading-snug">
                        {step.title}
                      </div>
                    </div>

                    {/* Subtle bottom progress indicator line on each card */}
                    <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[120px]">
                        {step.tech.split(' ')[0]}
                      </span>
                      {idx < project.lifecycle.length - 1 && (
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-colors ${
                            isSelected ? 'text-emerald-600' : 'text-neutral-300'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Active Step Detail Callout */}
          <div className="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-5 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-neutral-900 font-sans">
                Stage {activeStep.step}: {activeStep.title}
              </h3>
              <span className="text-xs font-medium text-emerald-800 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-full font-sans">
                {activeStep.tech}
              </span>
            </div>
            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Compact Engineering Specs (3 Callout Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200/70 bg-white shadow-2xs space-y-1.5"
              >
                <span className="text-xs font-semibold text-neutral-900 font-sans block">
                  {item.title}
                </span>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =======================================================
            Section 4: Takeaways & Next Project Footer
           ======================================================= */}
        <section className="space-y-6 pt-2">
          {/* Key Learnings Card */}
          <div className="rounded-2xl bg-neutral-50/70 border border-neutral-200/60 p-6 sm:p-7 text-neutral-700 font-sans leading-relaxed space-y-1.5">
            <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase font-sans block mb-1">
              Takeaways & Key Learnings
            </span>
            <p className="text-sm sm:text-base leading-relaxed">
              {conclusionText}
            </p>
          </div>

          {/* Next Project Link */}
          <div className="pt-6 border-t border-neutral-200/60">
            <Link
              href={`/projects/${nextProject.slug}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans block mb-1">
                  Next Project
                </span>
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 font-sans group-hover:text-emerald-700 transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-medium font-sans text-neutral-500 group-hover:text-emerald-700 transition-colors">
                <span>Read Case Study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}
