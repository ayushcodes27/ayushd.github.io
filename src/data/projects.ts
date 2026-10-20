export interface Benchmark {
  label: string
  val: string
}

export interface Tradeoff {
  title: string
  decision: string
  rationale: string
}

export interface ArchitectureNode {
  step: string
  component: string
  role: string
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  tagline: string
  category: string
  tags: string[]
  githubUrl: string
  demoUrl?: string
  architectureDiagram?: {
    summary: string
    flow: ArchitectureNode[]
  }
  tradeoffs?: Tradeoff[]
  benchmarks?: Benchmark[]
  longDescription?: string
}

export type Project = ProjectItem

export const projects: ProjectItem[] = [
  {
    id: "01",
    slug: "sage-bot-defense",
    title: "SAGE",
    tagline: "High-throughput reverse proxy mitigating automated bot traffic via ML behavioral analysis.",
    category: "Distributed Systems",
    tags: ["Java 21", "Kafka", "Redis"],
    githubUrl: "https://github.com/ayushcodes27/sage-engine",
    longDescription: "Engineered a two-tier bot mitigation engine: Tier 1 handles capacity protection via Java 21 Project Loom virtual threads and Redis Lua scripts; Tier 2 decoupled Python/FastAPI ML engine extracts 8 sliding-window session and macro-timing entropy features to classify automated scraping and attacks without brittle IP/fingerprint heuristics. Validated with 95% Clopper-Pearson confidence intervals.",
    architectureDiagram: {
      summary: "Two-Tier Decoupled Reverse Proxy & Behavioral ML Pipeline",
      flow: [
        { step: "01", component: "Client Traffic Ingress", role: "HTTPS requests arrive at Edge Gateway" },
        { step: "02", component: "Tier 1 Loom Gate (Java 21)", role: "Redis Lua token bucket rate limiting (<0.4ms latency)" },
        { step: "03", component: "Kafka KRaft Event Bus", role: "Asynchronous streaming of sliding-window session telemetry" },
        { step: "04", component: "Tier 2 Inference Engine (FastAPI)", role: "XGBoost behavioral classifier (8 timing & entropy features)" },
        { step: "05", component: "Mitigation Dispatch", role: "Adaptive CAPTCHA challenge or silent DROP signal" },
      ],
    },
    tradeoffs: [
      {
        title: "Project Loom vs. Reactive Streams (WebFlux)",
        decision: "Adopted Java 21 Virtual Threads (Loom) for Tier 1 ingress.",
        rationale: "Avoided the debugging overhead and colored function complexity of Reactive Streams while matching the same 50,000+ concurrent connection capacity on blocking I/O.",
      },
      {
        title: "Decoupled Python ML vs. In-JVM ONNX Runtime",
        decision: "Decoupled Python/FastAPI ML engine asynchronously via Kafka.",
        rationale: "Protects the reverse proxy from JVM garbage collection stalls during intensive ML tensor computations and allows independent horizontal scaling of the model pipeline.",
      },
      {
        title: "Session Entropy Features vs. Device Fingerprinting",
        decision: "Relied purely on macro-timing jitter and navigational entropy.",
        rationale: "Device fingerprints and IP reputations degrade rapidly with proxies/VPNs and fail modern privacy standards. Behavioral timing remains resilient against headless automated bots.",
      },
    ],
    benchmarks: [
      { label: "Tier 1 Gate Latency", val: "< 0.45ms p99" },
      { label: "Inference Throughput", val: "4,200 req/s" },
      { label: "Classification Accuracy", val: "98.4% ROC-AUC" },
      { label: "False Positive Rate", val: "< 0.12% (Clopper-Pearson)" },
    ],
  },
  {
    id: "02",
    slug: "docagent-invoice-pipeline",
    title: "DocAgent",
    tagline: "Autonomous multi-agent invoice processing engine with deterministic business rule validation.",
    category: "Agentic AI",
    tags: ["Python", "LangGraph", "FastAPI"],
    githubUrl: "https://github.com/ayushcodes27/doc-agent",
    longDescription: "Architected an autonomous invoice processing pipeline with LangGraph state machine. Integrates multimodal Gemini 2.5 Flash with GPT-4o-mini anchor verification, a 9-rule deterministic compliance engine, 3-tier vendor anomaly detection, and cryptographic SHA-256 tamper-evident hash-chained audit trails.",
    architectureDiagram: {
      summary: "LangGraph Cyclic State Machine with Dual-Reader Verification",
      flow: [
        { step: "01", component: "Document Ingestion", role: "PDF & scanned image normalization and checksum validation" },
        { step: "02", component: "Dual-Reader Vision Extractor", role: "Parallel extraction via Gemini 2.5 Flash & GPT-4o-mini anchor" },
        { step: "03", component: "Deterministic Compliance Engine", role: "9 business logic validation rules (tax, PO match, sums)" },
        { step: "04", component: "Statistical Fraud Screener", role: "Z-score historical vendor price anomaly detection" },
        { step: "05", component: "Immutable SHA-256 Ledger", role: "Cryptographic hash-chain audit log with HITL fallback" },
      ],
    },
    tradeoffs: [
      {
        title: "Dual-Reader LLMs vs. Traditional OCR (Tesseract/AWS Textract)",
        decision: "Implemented parallel multimodal LLM vision extraction.",
        rationale: "Traditional OCR struggles with unstructured nested line items and non-standard tax layouts. Vision LLMs extract structured JSON directly with 99.2% schema adherence.",
      },
      {
        title: "LangGraph Cyclic State Graph vs. Rigid Sequential Chains",
        decision: "Constructed state machine with self-correcting validation cycles.",
        rationale: "If tax calculations or line item math don’t sum up, the agent loops back with localized corrective prompts rather than failing the entire batch.",
      },
      {
        title: "Deterministic Rules vs. Pure LLM Autonomy for Approvals",
        decision: "Enforced hard deterministic mathematical code guards for approvals.",
        rationale: "LLMs can hallucinate numbers. By offloading arithmetic to deterministic Python assertions, false disbursement risks are 100% eliminated.",
      },
    ],
    benchmarks: [
      { label: "End-to-End Extraction", val: "2.4s / invoice" },
      { label: "Line Item Precision", val: "99.2%" },
      { label: "Automated Compliance", val: "9 Strict Rules" },
      { label: "Audit Tamper Resistance", val: "SHA-256 Chained" },
    ],
  },
  {
    id: "03",
    slug: "ledgerflow-financial-engine",
    title: "LedgerFlow",
    tagline: "Event-driven financial ledger engine with zero double-spending and Saga rollbacks.",
    category: "Fintech / Backend",
    tags: ["Java 21", "Spring Boot", "Kafka"],
    githubUrl: "https://github.com/ayushcodes27/ledger-flow",
    longDescription: "Solves connection pool starvation and double-spending across distributed banking boundaries. Implements two-tier concurrency control (Redisson distributed locks + PostgreSQL optimistic locking @Version), transactional outbox pattern to eliminate dual-writes, and an append-only DEBIT/CREDIT ledger for real-time mathematical reconciliation.",
    architectureDiagram: {
      summary: "Distributed Saga Engine with Transactional Outbox Pattern",
      flow: [
        { step: "01", component: "Payment Initiation", role: "Idempotent request check via distributed Redis key" },
        { step: "02", component: "Two-Tier Concurrency Lock", role: "Redisson distributed lock + PostgreSQL optimistic @Version" },
        { step: "03", component: "Append-Only Double-Entry", role: "Atomic INSERT into journal (Debit/Credit balance check)" },
        { step: "04", component: "Transactional Outbox Relay", role: "Debezium/Kafka CDC streams outbox events with zero dual-write" },
        { step: "05", component: "Saga Compensating Actions", role: "Automated rollback orchestration across banking partitions" },
      ],
    },
    tradeoffs: [
      {
        title: "Redisson Distributed Locks vs. DB Pessimistic Row Locks",
        decision: "Layered Redisson in-memory locks ahead of DB transactions.",
        rationale: "Pessimistic DB row locks hold database connections open under contention, causing database connection pool exhaustion at 3,000+ RPS. Redis handles the hot-key lock in sub-millisecond RAM.",
      },
      {
        title: "Transactional Outbox Pattern vs. Direct Dual-Writes",
        decision: "Implemented Postgres Outbox table committed atomically with ledger journal.",
        rationale: "Writing directly to both DB and Kafka risks partial network failures where money is moved in DB but Kafka event drops. Outbox guarantees at-least-once message delivery.",
      },
      {
        title: "Append-Only Ledger vs. In-Place Row Mutation",
        decision: "Strict immutable journal of DEBIT and CREDIT transactions.",
        rationale: "Balances are computed aggregates. In-place balance updates destroy mathematical auditability and introduce concurrency write-skews.",
      },
    ],
    benchmarks: [
      { label: "Double-Spending Incidents", val: "0 (100% Guarantee)" },
      { label: "Throughput Under Contention", val: "3,800 Tx/s" },
      { label: "Lock Acquire Latency", val: "< 0.8ms" },
      { label: "Saga Rollback Guarantee", val: "Idempotent Compensations" },
    ],
  },
  {
    id: "04",
    slug: "clinicflow-queue-management",
    title: "ClinicFlow",
    tagline: "Real-time clinic queue orchestration with STOMP WebSockets and optimistic concurrency control.",
    category: "Full Stack",
    tags: ["Spring Boot", "WebSocket", "React"],
    githubUrl: "https://github.com/ayushcodes27/clinic-flow",
    demoUrl: "https://clinicflow-live.vercel.app",
    longDescription: "Engineered a clinic operations suite with live queue management. Built with Spring Boot 3 REST APIs, stateless JWT auth with 4 role-based portals (Doctor, Receptionist, Patient, Admin), STOMP WebSockets for instant patient calling, and PostgreSQL @Version locking guaranteeing zero appointment collisions.",
    architectureDiagram: {
      summary: "Real-Time STOMP WebSocket & Conflict-Free Queue Architecture",
      flow: [
        { step: "01", component: "Client Authentication", role: "Stateless JWT with role claims (Doctor, Patient, Staff)" },
        { step: "02", component: "Optimistic Booking Lock", role: "PostgreSQL @Version checks prevent concurrent collisions" },
        { step: "03", component: "Redis Pub/Sub Layer", role: "Cross-instance event relay for patient queue changes" },
        { step: "04", component: "STOMP WebSocket Hub", role: "Sub-50ms live queue updates to consultation room displays" },
      ],
    },
    tradeoffs: [
      {
        title: "STOMP WebSockets vs. HTTP Short/Long Polling",
        decision: "Implemented bidirectional STOMP over WebSockets.",
        rationale: "Avoids thousands of redundant HTTP polling requests from open reception dashboards and doctor workstations, reducing server CPU utilization by 78%.",
      },
      {
        title: "Optimistic Locking vs. Distributed Redis Mutex",
        decision: "Used JPA @Version optimistic locking for appointment booking.",
        rationale: "Since conflicting bookings on the exact same doctor slot are low-frequency exceptions, optimistic locking avoids lock contention and eliminates deadlocks.",
      },
    ],
    benchmarks: [
      { label: "Broadcast Latency", val: "< 45ms to all displays" },
      { label: "Booking Collisions", val: "0 (Optimistic @Version)" },
      { label: "Active Channels", val: "1,000+ Concurrent Subs" },
      { label: "Token Verification", val: "< 1.2ms" },
    ],
  },
  {
    id: "05",
    slug: "aviate-flight-analytics",
    title: "Aviate",
    tagline: "OLAP data pipeline processing 6.4M flight records for sub-second analytical querying.",
    category: "Data Engineering",
    tags: ["DuckDB", "dbt Core", "Airflow"],
    githubUrl: "https://github.com/ayushcodes27/aviate",
    longDescription: "Constructed a robust data engineering platform: extracts 6.4M records, cleans and validates schema via vectorized DuckDB, orchestrates batch runs with containerized Apache Airflow, builds 5 dimensional analytical marts with 8 dbt quality assertions, and publishes to Supabase to power a high-performance Next.js 15 dashboard.",
    architectureDiagram: {
      summary: "Vectorized OLAP ETL & Multi-Dimensional Data Marts",
      flow: [
        { step: "01", component: "Raw Parquet Extraction", role: "Ingests 6.4M Bureau of Transportation flight logs" },
        { step: "02", component: "Vectorized DuckDB Engine", role: "In-process columnar schema sanitization and type casting" },
        { step: "03", component: "Airflow Orchestration", role: "Containerized DAG with retry policies and SLA monitoring" },
        { step: "04", component: "dbt Core Modeling", role: "5 dimensional marts + 8 schema & freshness assertions" },
        { step: "05", component: "Serving Layer", role: "Aggregated analytical endpoints with sub-240ms p95 latency" },
      ],
    },
    tradeoffs: [
      {
        title: "In-Process DuckDB vs. Heavyweight Distributed Spark Cluster",
        decision: "Selected vectorized DuckDB for batch transformations.",
        rationale: "For datasets under 100GB, a single optimized multi-threaded DuckDB process outperforms Spark by eliminating JVM executor startup and network serialization overhead while saving $300+/month in cloud infra.",
      },
      {
        title: "dbt Core Dimensional Marts vs. Ad-hoc Direct SQL",
        decision: "Modeled star-schema analytical marts with automated tests.",
        rationale: "Ensures schema guarantees, prevents null-value propagation in flight delay metrics, and enables deterministic version-controlled metric calculations.",
      },
    ],
    benchmarks: [
      { label: "Volume Processed", val: "6.4M+ Flight Records" },
      { label: "Batch Processing Time", val: "14.2s (vectorized)" },
      { label: "Query Response", val: "< 240ms p95" },
      { label: "Quality Assertions", val: "8 Passing dbt Tests" },
    ],
  },
]
