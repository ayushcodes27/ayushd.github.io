export interface Project {
  id: string
  code: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  metrics?: string
  image: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'sage-bot-detection',
    code: 'PR-0001',
    name: 'SAGE: Real-Time Bot Detection and Mitigation Engine',
    description: 'SAGE is a layered security engine designed to detect and mitigate bot attacks against web applications. Rather than relying on a single silver bullet, SAGE employs a defense-in-depth strategy combining traditional infrastructure protections with advanced behavioral machine learning.',
    longDescription: 'Engineered an end-to-end multi-layer bot mitigation platform integrating real-time telemetry processing, distributed Redis rate-limiting, and behavioural ML anomaly classifiers to defend web assets against automated abuse without impacting legitimate user experiences.',
    tags: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'Redis', 'Kafka', 'React'],
    metrics: 'Defense-In-Depth Architecture',
    image: '/assets/react_agent.jpg',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'medical-qa-assistant',
    code: 'PR-0002',
    name: 'Medical Q&A Assistant',
    description: 'A ReAct (Reasoning and Acting) AI agent designed to provide reliable, source-backed medical information. The agent uses a combination of local vector search (FAISS) and external APIs (OpenFDA) to answer health-related queries safely.',
    longDescription: 'Architected an autonomous healthcare query engine with grounded tool reasoning loops, FAISS semantic search indexing, and real-time OpenFDA pharmaceutical safety validation with safe medical guardrails.',
    tags: ['Python', 'LangChain', 'FAISS', 'OpenFDA API'],
    metrics: 'ReAct Agentic Reasoning Loop',
    image: '/assets/med_bot.jpg',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'ledgerflow-fintech',
    code: 'PR-0003',
    name: 'LedgerFlow',
    description: 'High-performance, event-driven FinTech ledger application demonstrating strict double-entry accounting and distributed systems resilience.',
    longDescription: 'Constructed an immutable, audit-compliant financial transaction engine backed by PostgreSQL ACID transactions, Apache Kafka event streams, and Redis cache synchronization ensuring zero double-spends and total ledger consistency.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Redis', 'Distributed Systems'],
    metrics: 'Strict Double-Entry Ledger',
    image: '/assets/arcade.jpg',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    featured: true
  }
]
