import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0f0f11] text-white border-t-2 border-black pt-12 pb-24 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
              <span className="w-2.5 h-2.5 bg-[#00f0ff] inline-block" />
              <span>AYUSH D. — PORTFOLIO // 2026 EDITION</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 font-bold border-2 border-white shadow-[3px_3px_0px_#00f0ff] hover:bg-[#00f0ff] transition-all self-start md:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} AYUSH D. ALL RIGHTS RESERVED.
          </div>
          <div>
            <span>HOSTED ON GITHUB PAGES</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
