import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact']
      const scrollY = window.scrollY + 180

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm group-hover:bg-zinc-700 transition-colors">
            AD
          </div>
          <span className="font-display font-bold text-base tracking-tight text-zinc-900">
            ayushd.me
          </span>
        </a>

        {/* Middle: Clean Navigation Links with Active Scroll Indicator */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'text-zinc-950 font-bold after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-zinc-900 after:rounded-full'
                    : 'text-zinc-500 hover:text-zinc-900 font-medium'
                }`}
              >
                {item.name}
              </a>
            )
          })}
        </nav>

        {/* Right Status & Personal Links */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* GitHub Discreet Link */}
          <a
            href="https://github.com/ayushcodes27"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-colors hidden xs:inline-flex"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn Discreet Link */}
          <a
            href="https://www.linkedin.com/in/ayushdeore23"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-colors hidden xs:inline-flex"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Get In Touch CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg px-3.5 py-2 text-xs font-mono font-medium transition-all shadow-sm"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

      </div>
    </header>
  )
}
