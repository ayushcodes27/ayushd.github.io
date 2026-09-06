import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-black text-white font-mono font-black text-sm flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
            AD
          </div>
          <span className="font-display font-black text-lg tracking-tight text-black">
            AYUSH.DEV
          </span>
        </a>

        {/* Right Status & Quick Action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 bg-zinc-100 border border-black px-2.5 py-1 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Work</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] hidden xs:inline-flex"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-black text-white font-mono font-bold text-xs px-3.5 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-zinc-800 transition-all active:translate-y-0.5"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  )
}
