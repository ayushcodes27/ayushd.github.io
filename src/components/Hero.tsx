import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import LottieMascot from './LottieMascot'

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-zinc-200/80 bg-white overflow-hidden">
      {/* Soft Radial Ambient Depth & Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-100/35 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-neutral-100/60 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Refined Status Pill */}
              <div className="inline-flex items-center gap-2 bg-zinc-100/80 border border-zinc-200/90 text-zinc-800 px-3 py-1 rounded-full text-xs font-mono font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>BACKEND & SYSTEMS ENGINEER</span>
              </div>

              {/* Bold Display Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-zinc-950 uppercase leading-[0.95] mb-6 font-display">
                AYUSH DEORE.
              </h1>

              {/* Bio: The First-Principles Angle */}
              <p className="text-lg sm:text-xl text-zinc-600 max-w-xl mb-9 leading-relaxed font-sans">
                Software engineer driven by strong systems fundamentals and practical problem-solving. Exploring the intersection of scalable backend engineering, distributed data, and modern AI.
              </p>

              {/* Action Buttons: Unified Sans-Serif CTAs with Smooth Anchor Scroll */}
              <div className="flex flex-wrap items-center gap-4 font-sans">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('projects')
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3.5 rounded-lg hover:bg-zinc-800 transition-all text-sm shadow-sm hover:shadow cursor-pointer"
                >
                  <span>View Projects</span>
                  <ArrowDown className="w-4 h-4 text-zinc-400" />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 font-medium px-6 py-3.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all text-sm shadow-sm hover:shadow group cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 transition-colors" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Lottie Mascot */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full flex items-center justify-center"
            >
              <LottieMascot />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
