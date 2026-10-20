import { User, Code, Brain, Compass, ArrowRight } from 'lucide-react'

export default function About() {
  const pillars = [
    {
      icon: <Brain className="w-5 h-5 text-black" />,
      title: 'Autonomous AI Agents',
      desc: 'Designing reasoning loops (ReAct / Plan-and-Solve), memory vector stores, tool-calling pipelines, and safe orchestration architectures for production LLMs.'
    },
    {
      icon: <Code className="w-5 h-5 text-black" />,
      title: 'Distributed Backends & APIs',
      desc: 'Building high-throughput FastAPI and Python asynchronous services, robust PostgreSQL schemas, Redis caching layers, and containerized Docker workflows.'
    },
    {
      icon: <Compass className="w-5 h-5 text-black" />,
      title: 'Real-Time 3D & Graphics',
      desc: 'Crafting WebGL shaders, Three.js 3D environments, physics simulations, and buttery smooth responsive user experiences.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-[#fafafa] border-b-2 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-xs font-mono font-bold mb-3 border-2 border-black shadow-[3px_3px_0px_#000]">
            <User className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>BIO_AND_CAPABILITIES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight font-display uppercase">
            ENGINEERING FOUNDATION
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-mono mt-1">
            Bridging deep artificial intelligence research with rock-solid software engineering.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_#000]">
            <h3 className="text-2xl font-black font-display text-black mb-4">
              ABOUT AYUSH D.
            </h3>
            
            <div className="space-y-4 text-zinc-800 text-base leading-relaxed font-sans">
              <p>
                I am a software engineer and AI enthusiast passionate about creating autonomous systems, 
                intelligent tools, and interactive digital interfaces that bridge the gap between machine intelligence and end users.
              </p>
              <p>
                My work centers around turning complex machine learning algorithms, LLM reasoning logic, 
                and distributed backend workflows into intuitive, resilient, and responsive applications.
              </p>
              <p>
                Whether it's building multi-agent AI frameworks that execute autonomous tool chains, 
                deploying specialized NLP clinical assistants, or engineering full 3D physics-driven browser games, 
                I focus on writing clean, maintainable, and high-performance code.
              </p>
            </div>

            {/* Core Pillars List */}
            <div className="mt-8 pt-6 border-t-2 border-black grid grid-cols-1 gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="border-2 border-black p-4 bg-zinc-50 hover:bg-white transition-all shadow-[3px_3px_0px_#000]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-[#00f0ff] border border-black shadow-[1px_1px_0px_#000]">
                      {pillar.icon}
                    </div>
                    <h4 className="font-bold text-base font-display text-black">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Terminal Spec Box + Current Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Terminal Card */}
            <div className="bg-[#0f0f11] text-white border-2 border-black p-6 shadow-[8px_8px_0px_#000] font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4 text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span>user@ayush-dev:~</span>
              </div>

              <div className="space-y-3">
                <div className="text-emerald-400 font-bold">
                  $ cat system_specs.json
                </div>
                <div className="text-zinc-300 pl-2 border-l border-zinc-800 space-y-1 text-[11px]">
                  <p>{"{"}</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"name"</span>: "Ayush D.",</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"role"</span>: "Software & AI Systems Engineer",</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"focus"</span>: ["Autonomous AI Agents", "Distributed Ledgers", "Large-Scale Pipelines"],</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"core_stack"</span>: ["Java 21 / Spring Boot", "Python / LangGraph", "Kafka / Redis", "DuckDB / dbt", "TypeScript / Next.js"],</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"status"</span>: "Available for ambitious projects",</p>
                  <p className="pl-3"><span className="text-[#00f0ff]">"location"</span>: "Remote / Global"</p>
                  <p>{"}"}</p>
                </div>

                <div className="text-emerald-400 font-bold pt-2">
                  $ ./verify_status --verbose
                </div>
                <p className="text-zinc-400 pl-2">
                  [OK] Clean code architecture verified.<br />
                  [OK] Microservice orchestrations ready.<br />
                  [OK] High-fidelity 3D pipelines loaded.
                </p>
              </div>
            </div>

            {/* Quick Connect Callout */}
            <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_#000]">
              <h4 className="text-lg font-black font-display uppercase text-black mb-2">
                LET'S BUILD SOMETHING EXTRAORDINARY
              </h4>
              <p className="text-xs text-zinc-600 font-sans mb-4">
                Looking for a full-stack engineer or AI specialist to build your next breakthrough product?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-black text-white font-mono font-bold text-xs px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-800 hover:shadow-[5px_5px_0px_#000] transition-all"
              >
                <span>INITIATE CONTACT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
