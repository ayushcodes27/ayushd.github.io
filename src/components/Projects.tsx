import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Link from './Link'

const projects = [
  {
    id: "ledgerflow",
    num: "01",
    tech: "JAVA 21 • SPRING BOOT • KAFKA • REDIS",
    category: "Fintech / Backend",
    title: "LedgerFlow",
    summary:
      "Event-driven financial ledger engine with zero double-spending and Saga rollbacks.",
    metrics: [
      { label: "Double-Spending Incidents", value: "0 (100% Guarantee)" },
      { label: "Throughput Under Contention", value: "3,800 Tx/s" },
    ],
    highlight: "Distributed Saga Engine with Transactional Outbox Pattern",
    github: "https://github.com/ayushcodes27/ledger-flow",
  },
  {
    id: "docagent",
    num: "02",
    tech: "PYTHON • LANGGRAPH • FASTAPI • GEMINI",
    category: "Agentic AI",
    title: "DocAgent",
    summary:
      "Autonomous multi-agent invoice processing engine with deterministic business rule validation.",
    metrics: [
      { label: "End-to-End Extraction", value: "2.4s / invoice" },
      { label: "Line Item Precision", value: "99.2% Accuracy" },
    ],
    highlight: "LangGraph Cyclic State Machine with Dual-Reader Verification",
    github: "https://github.com/ayushcodes27/doc-agent",
  },
  {
    id: "clinicflow",
    num: "03",
    tech: "SPRING BOOT • WEBSOCKET • REACT • POSTGRES",
    category: "Full Stack",
    title: "ClinicFlow",
    summary:
      "Real-time clinic queue orchestration with STOMP WebSockets and optimistic concurrency control.",
    metrics: [
      { label: "Broadcast Latency", value: "< 45ms to displays" },
      { label: "Booking Collisions", value: "0 (Optimistic Lock)" },
    ],
    highlight: "Real-Time STOMP WebSocket & Conflict-Free Queue Architecture",
    github: "https://github.com/ayushcodes27/clinic-flow",
  },
  {
    id: "sage",
    num: "04",
    tech: "JAVA 21 • KAFKA • REDIS • XGBOOST",
    category: "Distributed Systems",
    title: "SAGE",
    summary:
      "High-throughput reverse proxy mitigating automated bot traffic via ML behavioral analysis.",
    metrics: [
      { label: "Tier 1 Gate Latency", value: "< 0.45ms p99" },
      { label: "Inference Throughput", value: "4,200 req/s" },
    ],
    highlight: "Two-Tier Decoupled Reverse Proxy & Behavioral ML Pipeline",
    github: "https://github.com/ayushcodes27/sage-engine",
  },
  {
    id: "aviate",
    num: "05",
    tech: "DUCKDB • DBT CORE • AIRFLOW • SUPABASE",
    category: "Data Engineering",
    title: "Aviate",
    summary:
      "OLAP data pipeline processing 6.4M flight records for sub-second analytical querying.",
    metrics: [
      { label: "Volume Processed", value: "6.4M+ Flight Records" },
      { label: "Batch Processing Time", value: "14.2s (vectorized)" },
    ],
    highlight: "Vectorized OLAP ETL & Multi-Dimensional Data Marts",
    github: "https://github.com/ayushcodes27/aviate",
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 65%"],
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative max-w-7xl mx-auto pt-20 pb-16 px-6 text-neutral-900 scroll-mt-20"
    >
      {/* Top Pill Badge */}
      <div className="flex justify-start md:justify-center mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-medium">
            Few Projects
          </span>
        </div>
      </div>

      {/* DESKTOP PRONOUNCED S-CURVE ROADMAP SPINE */}
      <div className="hidden md:block absolute left-1/2 top-32 bottom-16 w-48 -translate-x-1/2 pointer-events-none z-0">
        <svg
          viewBox="0 0 200 1000"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          {/* Background Dashed S-Curve */}
          <path
            d="M 100 0
               C 100 40, 25 50, 25 110
               C 25 190, 175 230, 175 305
               C 175 380, 25 425, 25 500
               C 25 575, 175 620, 175 695
               C 175 770, 25 810, 25 890
               C 25 950, 100 960, 100 1000"
            stroke="#D4D4D4"
            strokeWidth="2"
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Scroll-Animated Solid Charcoal S-Curve */}
          <motion.path
            d="M 100 0
               C 100 40, 25 50, 25 110
               C 25 190, 175 230, 175 305
               C 175 380, 25 425, 25 500
               C 25 575, 175 620, 175 695
               C 175 770, 25 810, 25 890
               C 25 950, 100 960, 100 1000"
            stroke="#171717"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* MOBILE FALLBACK SPINE */}
      <div className="md:hidden absolute left-9 top-28 bottom-20 w-[1.5px] bg-neutral-200 -translate-x-1/2" />
      <motion.div
        style={{ scaleY: pathLength, transformOrigin: "top" }}
        className="md:hidden absolute left-9 top-28 bottom-20 w-[2px] bg-neutral-900 -translate-x-1/2 z-10"
      />

      {/* Project Cards Journey (Tighter vertical overlap via md:-mt-28) */}
      <div className="space-y-14 md:space-y-0">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={project.id}
              className={`relative flex items-center justify-between md:justify-normal ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } ${index !== 0 ? "md:-mt-28" : ""}`}
            >
              {/* Center Numbered Node (Synced to S-Curve peaks at ±72px from center) */}
              <div
                className={`absolute left-9 md:left-1/2 w-10 h-10 rounded-full bg-white border-2 border-neutral-900 -translate-x-1/2 z-20 flex items-center justify-center shadow-sm ${
                  isEven ? "md:-ml-[72px]" : "md:ml-[72px]"
                }`}
              >
                <span className="text-[11px] font-mono font-bold text-neutral-900">
                  {project.num}
                </span>
              </div>

              {/* Dotted Horizontal Breathing-Room Connector between Node and Card */}
              <div
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 border-t-2 border-dotted border-neutral-300 z-0 ${
                  isEven
                    ? "right-1/2 mr-[96px]"
                    : "left-1/2 ml-[96px]"
                }`}
              />

              {/* Card Container (Narrowed to 41% so there is a crisp gap from the curvy spine) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full pl-14 md:pl-0 md:w-[41%]"
              >
                <div className="group relative rounded-2xl bg-white border border-neutral-200/90 overflow-hidden transition-all duration-300 hover:border-neutral-900 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  
                  {/* Full-Card Clickable Overlay -> Opens Subpage */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Explore ${project.title} case study`}
                  >
                    <span className="sr-only">Explore {project.title} case study</span>
                  </Link>

                  {/* Top Content Area */}
                  <div className="p-7 pb-6">
                    {/* Row 1: Index + Category Badge + Individual Tech Pills */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                        <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-900">
                          {project.category}
                        </span>
                      </div>

                      {/* Individual Tech Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.split("•").map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-neutral-100 text-neutral-600 border border-neutral-200/80"
                          >
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: Title & Summary */}
                    <h3 className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed font-sans">
                      {project.summary}
                    </p>

                    {/* Row 3: Architecture Blueprint Callout (No truncation) */}
                    <div className="mt-4 pl-3 border-l-2 border-neutral-900 py-0.5">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        Core Architecture
                      </span>
                      <span className="text-xs font-mono font-medium text-neutral-800 leading-snug">
                        {project.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Middle Area: Edge-to-Edge Blueprint Metrics Grid */}
                  <div className="grid grid-cols-2 border-y border-neutral-200/80 bg-neutral-50/60 divide-x divide-neutral-200/80">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="px-7 py-3.5">
                        <div className="text-[11px] font-mono text-neutral-500">
                          {m.label}
                        </div>
                        <div className="text-base font-mono font-extrabold text-neutral-900 mt-0.5 tracking-tight">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Footer: Clear Subpage CTA + Separate GitHub Button */}
                  <div className="px-7 py-3.5 bg-white flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
                      <span>Read System Design</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-sm font-sans">
                        →
                      </span>
                    </div>

                    {/* Z-20 GitHub Link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all"
                      title="View Source on GitHub"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Source</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
