import { motion } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons'
import Scene3DHero from './Scene3DHero'

export default function Hero() {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b-2 border-black grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Grid: Bold Typography + 3D Mascot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Huge Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-[0.92] mb-6 font-display">
                AYUSH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-800 to-zinc-600 underline decoration-4 decoration-black underline-offset-8">
                  DEORE.
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-zinc-800 max-w-xl mb-8 leading-relaxed">
                A developer who loves turning hard problems into elegant, working systems — from <span className="font-bold underline decoration-2 decoration-[#00f0ff]">autonomous AI agents</span> to <span className="font-bold underline decoration-2 decoration-[#00f0ff]">interactive 3D experiences</span> on the web.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white font-mono font-bold px-6 py-3.5 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-zinc-800 hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all text-sm"
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-mono font-bold px-5 py-3.5 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-zinc-100 hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>GET IN TOUCH</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3.5 bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-zinc-100 hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>

              {/* Tech Highlights Footer */}
              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t-2 border-black/20 w-full">
                {['Java', 'Python', 'TypeScript', 'LangChain', 'FastAPI', 'Docker'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-black bg-white px-2.5 py-1 text-xs font-mono font-semibold shadow-[2px_2px_0px_#000]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Scene Mascot Canvas */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white border-2 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-2 border-black font-mono text-xs">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>INTERACTIVE_MASCOT_3D</span>
                </span>
                <span className="text-[#00f0ff] font-bold">RENDER_R3F</span>
              </div>

              {/* 3D Canvas */}
              <Scene3DHero />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
