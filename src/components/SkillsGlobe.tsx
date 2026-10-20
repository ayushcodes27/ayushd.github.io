import { useState } from 'react'
import { Terminal, Server, Brain, Wrench, Layers, CheckCircle2, SlidersHorizontal } from 'lucide-react'
import { TechIcon } from './TechIcons'
import { motion, AnimatePresence } from 'framer-motion'

interface SkillItem {
  name: string
  detail: string
  projects?: string
  isCore: boolean
}

interface SkillCategory {
  title: string
  subtitle: string
  icon: typeof Terminal
  items: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    subtitle: 'Core programming & systems',
    icon: Terminal,
    items: [
      { name: 'Java 21', detail: 'Project Loom, Virtual Threads, Memory Management', projects: 'LedgerFlow • SAGE Engine', isCore: true },
      { name: 'Python 3.12', detail: 'AsyncIO, Pydantic v2, Vectorized Computing', projects: 'DocAgent • SAGE Engine', isCore: true },
      { name: 'SQL (Postgres/DuckDB)', detail: 'Complex Aggregations, Index Optimization, EXPLAIN', projects: 'LedgerFlow • Aviate', isCore: true },
      { name: 'TypeScript', detail: 'Strict Type Safety, Generics, Modern ESNext', projects: 'Aviate • ClinicFlow', isCore: true },
      // Extended skills revealed on "All Technologies"
      { name: 'Go (Golang)', detail: 'Goroutines, Channels, Low-Overhead Network Services', isCore: false },
      { name: 'C / C++', detail: 'Systems Programming, Memory Pointer Arithmetic', isCore: false },
    ],
  },
  {
    title: 'Core Systems',
    subtitle: 'High-throughput backend architecture',
    icon: Server,
    items: [
      { name: 'Kafka KRaft', detail: 'Partitioning strategies, consumer groups, exactly-once semantics', projects: 'LedgerFlow • SAGE Engine', isCore: true },
      { name: 'Redis 7', detail: 'Distributed locks (Redisson), sliding-window rate limiting, Lua scripts', projects: 'LedgerFlow • SAGE Engine', isCore: true },
      { name: 'Spring Boot 3', detail: 'High-concurrency REST, JPA Optimistic Locking, STOMP WebSockets', projects: 'LedgerFlow • ClinicFlow', isCore: true },
      { name: 'PostgreSQL', detail: 'Two-tier concurrency control, ACID isolation, Outbox Pattern', projects: 'LedgerFlow • DocAgent', isCore: true },
      { name: 'DuckDB', detail: 'Embedded OLAP, Vectorized Execution, Sub-Second Queries', projects: 'Aviate Data Pipeline', isCore: true },
      { name: 'FastAPI', detail: 'Asynchronous Microservices, High-Performance I/O', projects: 'DocAgent • SAGE Engine', isCore: true },
      // Extended
      { name: 'GraphQL', detail: 'Federated Schemas, DataLoader, Query Depth Limits', isCore: false },
      { name: 'gRPC / Protobuf', detail: 'Binary Protocol, Bidirectional Streaming RPCs', isCore: false },
    ],
  },
  {
    title: 'AI & Agentic Systems',
    subtitle: 'Autonomous workflows & ML inference',
    icon: Brain,
    items: [
      { name: 'LangGraph', detail: 'Cyclic state machines, ReAct reasoning loops, self-correction', projects: 'DocAgent', isCore: true },
      { name: 'Multimodal LLMs', detail: 'Gemini 2.5 Flash & GPT-4o Vision, Structured Output Extraction', projects: 'DocAgent', isCore: true },
      { name: 'XGBoost', detail: 'Session-level behavioral classification, sliding-window entropy', projects: 'SAGE Engine', isCore: true },
      { name: 'Vector Stores & RAG', detail: 'Embeddings, Cosine Similarity, Deterministic Grounding', projects: 'DocAgent', isCore: true },
      // Extended
      { name: 'Hugging Face / PyTorch', detail: 'Transformer Tokenization, Local Embedding Serving', isCore: false },
      { name: 'NLP Pipelines', detail: 'Named Entity Recognition, Document Segmentation', isCore: false },
    ],
  },
  {
    title: 'Infrastructure & Tools',
    subtitle: 'Deployment, pipelines & data ops',
    icon: Wrench,
    items: [
      { name: 'Docker & Compose', detail: 'Multi-stage builds, non-root security, container networking', projects: 'All Flagship Projects', isCore: true },
      { name: 'Apache Airflow', detail: 'Batch DAG scheduling, SLA monitoring, backfill runs', projects: 'Aviate Data Pipeline', isCore: true },
      { name: 'dbt Core', detail: 'Star-schema dimensional modeling, 8 automated quality tests', projects: 'Aviate Data Pipeline', isCore: true },
      { name: 'Git & GitHub Actions', detail: 'Automated CI/CD pipelines, semantic releases', projects: 'All Repositories', isCore: true },
      // Extended
      { name: 'AWS (S3, ECS, IAM)', detail: 'Cloud Storage, Managed Containers, Role Policies', isCore: false },
      { name: 'Linux Internals', detail: 'cgroups, epoll I/O multiplexing, Bash automation', isCore: false },
    ],
  },
]

const coreFundamentals = [
  'Distributed Consensus',
  'Concurrency & Thread Safety',
  'ACID Transactions & Isolation',
  'Database Indexing & B-Trees',
  'Microservices & Saga Pattern',
  'Event-Driven Architecture',
  'Idempotent API Design',
  'Cache Stampede Mitigation',
  'Low-Latency Rate Limiting',
  'Fault Tolerance & Circuit Breaking',
]

export default function SkillsGlobe() {
  const [depthMode, setDepthMode] = useState<'core' | 'all'>('core')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#fbfbfb] border-b border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Depth Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-zinc-600" />
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-display uppercase">
              SKILLS & ARCHITECTURAL DEPTH
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-sans mt-2 max-w-2xl leading-relaxed">
              Granular competencies across backend distributed systems, agentic AI, and data pipelines. Click any skill to inspect project evidence.
            </p>
          </div>

          {/* Interactive Depth Toggle: Core Stack vs All Technologies */}
          <div className="flex items-center p-1 bg-zinc-200/60 rounded-xl border border-zinc-300/60 shadow-inner self-start md:self-auto">
            <button
              onClick={() => setDepthMode('core')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                depthMode === 'core'
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>Core Stack</span>
            </button>
            <button
              onClick={() => setDepthMode('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                depthMode === 'all'
                  ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>All Technologies</span>
            </button>
          </div>
        </div>

        {/* 4-Column Responsive Tabular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {skillCategories.map((cat) => {
            const Icon = cat.icon
            const displayedItems = depthMode === 'core' 
              ? cat.items.filter(i => i.isCore) 
              : cat.items

            return (
              <div
                key={cat.title}
                className="bg-white border border-zinc-200/90 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-800 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-sans text-zinc-500 leading-tight">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills Table List with Concrete Evidence */}
                  <div className="mt-5 space-y-3 border-t border-zinc-100 pt-4">
                    <AnimatePresence>
                      {displayedItems.map((item) => {
                        const isSelected = selectedSkill === item.name
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(isSelected ? null : item.name)}
                            className={`p-2 rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-zinc-100/90 border border-zinc-300'
                                : 'hover:bg-zinc-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <TechIcon name={item.name} className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                <span className="font-mono font-semibold text-xs text-zinc-900">
                                  {item.name}
                                </span>
                              </div>
                              {item.projects && (
                                <span className="text-[9.5px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">
                                  In Case Study
                                </span>
                              )}
                            </div>

                            {/* Concrete Architectural Bullet Point */}
                            <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-snug">
                              {item.detail}
                            </p>

                            {/* Direct Project Evidence on click or hover */}
                            {item.projects && (
                              <div className="mt-1.5 text-[10.5px] font-mono text-zinc-500 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>Evidence: {item.projects}</span>
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Count Pill */}
                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{displayedItems.length} competencies</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            )
          })}
        </div>

        {/* --- SYSTEM CONCEPTS & CS FUNDAMENTALS SECTION --- */}
        <div className="mt-12 p-6 sm:p-7 bg-white border border-zinc-200/90 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-base text-zinc-950 uppercase tracking-tight">
                System Concepts & CS Fundamentals
              </h3>
              <p className="text-xs font-sans text-zinc-500 mt-0.5">
                Core architectural paradigms applied across high-concurrency systems, storage engines, and multi-tenant backends.
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-zinc-400 shrink-0">
              10 Foundational Principles
            </span>
          </div>

          {/* Minimal Pill-Tag Area for Core Fundamentals */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
            {coreFundamentals.map((concept) => (
              <span
                key={concept}
                className="border border-zinc-200 bg-zinc-50/80 text-zinc-800 px-3 py-1.5 text-xs font-mono rounded-lg font-medium shadow-sm hover:border-zinc-300 hover:bg-zinc-100 transition-colors"
              >
                ✦ {concept}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
