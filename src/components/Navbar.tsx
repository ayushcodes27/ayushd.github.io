import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Search, Menu, X, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const handleOpenPalette = () => {
    setMobileMenuOpen(false)
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 z-40 w-[92%] max-w-5xl -translate-x-1/2 rounded-full border border-neutral-200/80 bg-white/85 px-4 sm:px-6 py-2.5 backdrop-blur-md shadow-xs transition-all flex items-center justify-between font-sans">
        {/* Brand Monogram */}
        <a
          href="#hero"
          onClick={() => {
            setActiveSection('hero')
            setMobileMenuOpen(false)
          }}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 text-white font-sans font-bold text-xs flex items-center justify-center shadow-xs group-hover:bg-zinc-700 transition-colors">
            AD
          </div>
          <span className="font-sans font-semibold text-sm sm:text-base tracking-tight text-zinc-900">
            ayushd.me
          </span>
        </a>

        {/* Desktop: Navigation Links with Spring layoutId Active Indicator */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-full font-sans ${
                  isActive
                    ? 'text-zinc-950 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-900 rounded-full"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Status, Actions & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Command Palette Launcher */}
          <button
            type="button"
            onClick={handleOpenPalette}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200/80 rounded-full transition-colors cursor-pointer font-sans"
            title="Search projects & actions (⌘K)"
          >
            <Search className="w-3 h-3 text-neutral-400" />
            <span className="text-[11px] font-medium hidden xs:inline">Search</span>
            <kbd className="font-mono text-[10px] text-neutral-400 bg-white border border-neutral-200 px-1 py-0.2 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Discreet Link (Desktop) */}
          <a
            href="https://github.com/ayushcodes27"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors hidden sm:inline-flex"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn Discreet Link (Desktop) */}
          <a
            href="https://www.linkedin.com/in/ayushdeore23"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors hidden sm:inline-flex"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Get In Touch CTA */}
          <a
            href="#contact"
            onClick={() => setActiveSection('contact')}
            className="inline-flex items-center gap-1 bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-3 py-1.5 text-xs font-medium font-sans transition-all shadow-xs"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed top-18 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-2xl border border-neutral-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden font-sans space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-100 text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>Resume</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-2 text-xs text-neutral-500">
              <button
                type="button"
                onClick={handleOpenPalette}
                className="flex items-center gap-1.5 font-medium text-neutral-700 hover:text-neutral-950"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search projects (⌘K)</span>
              </button>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/ayushcodes27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayushdeore23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
