import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from './Link'

const PROJECTS = [
  {
    id: "01",
    slug: "ledgerflow",
    title: "LedgerFlow",
    category: "Distributed Systems",
    tag: "FINTECH / BACKEND",
    metric: "3,800 Tx/s",
    description:
      "Event-driven financial ledger engine with zero double-spending and automated Saga compensations.",
    stack: ["Java 21", "Spring Boot", "Kafka", "Redis"],
    demoUrl: "https://github.com/ayushcodes27/ledger-flow#benchmarks-and-load-testing",
    sourceUrl: "https://github.com/ayushcodes27/ledger-flow",
  },
  {
    id: "02",
    slug: "docagent",
    title: "DocAgent",
    category: "AI",
    tag: "AGENTIC AI",
    metric: "99.2% Accuracy",
    description:
      "Autonomous multi-agent invoice processing pipeline with dual-reader verification and deterministic math guards.",
    stack: ["Python", "LangGraph", "FastAPI", "Gemini"],
    demoUrl: "https://github.com/ayushcodes27/doc-agent#demo",
    sourceUrl: "https://github.com/ayushcodes27/doc-agent",
  },
  {
    id: "03",
    slug: "clinicflow",
    title: "ClinicFlow",
    category: "Full Stack",
    tag: "FULL STACK",
    metric: "< 45ms Latency",
    description:
      "Real-time clinic queue orchestration with STOMP WebSockets and optimistic concurrency control.",
    stack: ["Spring Boot", "WebSocket", "React", "Postgres"],
    demoUrl: "https://clinicflow-live.vercel.app",
    sourceUrl: "https://github.com/ayushcodes27/clinic-flow",
  },
  {
    id: "04",
    slug: "sage",
    title: "SAGE",
    category: "Distributed Systems",
    tag: "DISTRIBUTED SYSTEMS",
    metric: "p99 < 0.45ms",
    description:
      "High-throughput reverse proxy mitigating bot attacks via Project Loom virtual threads and ML analysis.",
    stack: ["Java 21", "Kafka", "Redis", "XGBoost"],
    demoUrl: "https://github.com/ayushcodes27/sage-engine#load-test-demo",
    sourceUrl: "https://github.com/ayushcodes27/sage-engine",
  },
  {
    id: "05",
    slug: "aviate",
    title: "Aviate",
    category: "Data",
    tag: "DATA ENGINEERING",
    metric: "6.4M Records",
    description:
      "OLAP data pipeline processing 6.4M flight records for sub-second analytical querying.",
    stack: ["DuckDB", "dbt Core", "Airflow", "Supabase"],
    demoUrl: "https://github.com/ayushcodes27/aviate#benchmarks",
    sourceUrl: "https://github.com/ayushcodes27/aviate",
  },
]

const FILTERS = ["All", "Distributed Systems", "AI", "Data", "Full Stack"]

const TECH_STACK = [
  {
    num: "01",
    domain: "Languages",
    skills: ["Java 21", "Python", "TypeScript", "SQL"],
  },
  {
    num: "02",
    domain: "Backend & Systems",
    skills: ["Spring Boot", "FastAPI", "Kafka", "Redis", "WebSockets"],
  },
  {
    num: "03",
    domain: "Data & AI",
    skills: ["PostgreSQL", "LangGraph", "XGBoost", "Gemini API"],
  },
  {
    num: "04",
    domain: "Infrastructure",
    skills: ["Docker", "Linux", "Git", "CI/CD"],
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeId, setActiveId] = useState<string | null>(null)

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => {
          if (activeFilter === "Data") return p.category === "Data" || p.tag.includes("DATA")
          return p.category === activeFilter
        })

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24 scroll-mt-20">
      {/* Header + Minimalist Tabs */}
      <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Selected Work
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display">
            Featured Systems
          </h2>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative pb-1 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 font-medium"
                }`}
              >
                <span>{filter}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeEditorialFilterUnderline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute -bottom-[25px] left-0 right-0 h-[2px] bg-neutral-900"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Editorial Rows */}
      <div className="divide-y divide-neutral-200 border-b border-neutral-200">
        {filtered.map((project) => {
          const isOpen = activeId === project.id

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group block cursor-pointer px-4 py-7 transition-colors duration-200 hover:bg-neutral-50/80"
            >
              {/* Top Always-Visible Row */}
              <div className="grid grid-cols-12 items-center gap-4">
                <span className="col-span-2 font-mono text-sm text-neutral-400 md:col-span-1">
                  {project.id}
                </span>

                <h3 className="col-span-10 text-2xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-black md:col-span-5 font-display">
                  {project.title}
                </h3>

                <span className="hidden font-mono text-xs tracking-wider text-neutral-500 md:col-span-3 md:block">
                  {project.tag}
                </span>

                <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-end md:gap-4">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 font-mono text-xs font-medium text-emerald-700">
                    {project.metric}
                  </span>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                    <span className="font-mono text-sm leading-none">↗</span>
                  </div>
                </div>
              </div>

              {/* Smooth Hover-Expanded Drawer on Desktop, Visible by Default on Mobile */}
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "max-md:mt-3 max-md:grid-rows-[1fr] max-md:opacity-100 md:grid-rows-[0fr] md:opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 pt-1">
                    <div className="col-span-12 md:col-span-7 md:col-start-2">
                      <p className="text-sm leading-relaxed text-neutral-600 font-sans">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-neutral-200 bg-white px-2.5 py-0.5 font-mono text-[11px] text-neutral-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-12 flex items-center gap-4 font-mono text-xs md:col-span-4 md:justify-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 font-mono text-xs font-medium text-white transition-all group-hover:bg-neutral-800 shadow-xs">
                        <span>Case Study</span>
                        <span>→</span>
                      </span>
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <button
                          type="button"
                          className="text-emerald-700 hover:text-emerald-900 font-medium font-mono text-xs cursor-pointer py-1"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.open(project.demoUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          Demo ↗
                        </button>
                      )}
                      <button
                        type="button"
                        className="text-neutral-500 hover:text-neutral-900 font-mono text-xs cursor-pointer py-1"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(project.sourceUrl, '_blank', 'noopener,noreferrer')
                        }}
                      >
                        Source ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Minimalist Technical Stack Index */}
      <div className="mt-24 pt-14 border-t border-neutral-200">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Core Capabilities
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
            Technical Stack Index
          </h2>
        </div>

        {/* 4-Row Hairline Table */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {TECH_STACK.map((row) => (
            <div
              key={row.num}
              className="grid grid-cols-12 items-baseline py-4 px-3 sm:px-4 hover:bg-neutral-50/70 transition-colors group"
            >
              <span className="col-span-2 sm:col-span-1 font-mono text-xs text-neutral-400 group-hover:text-neutral-900 transition-colors">
                {row.num}
              </span>
              <span className="col-span-10 sm:col-span-4 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
                {row.domain}
              </span>
              <div className="col-span-12 sm:col-span-7 mt-2 sm:mt-0 font-mono text-xs text-neutral-600 flex flex-wrap gap-x-2.5 gap-y-1">
                {row.skills.map((skill, idx) => (
                  <span key={skill} className="flex items-center gap-2">
                    <span className="hover:text-neutral-950 transition-colors font-medium">
                      {skill}
                    </span>
                    {idx < row.skills.length - 1 && (
                      <span className="text-neutral-300">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
