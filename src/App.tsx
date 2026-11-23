import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsGlobe from './components/SkillsGlobe'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectSubpage from './components/ProjectSubpage'
import CommandPalette from './components/CommandPalette'
import NotFound from './components/NotFound'
import { projects } from './data/projects'

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || window.location.hash : '/'
  )
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Initialize buttery momentum scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Listen to navigation events
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname !== '/' ? window.location.pathname : window.location.hash
      setCurrentPath(path)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  // Global Command Palette listeners (Cmd+K / Ctrl+K and custom event)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsPaletteOpen((prev) => !prev)
      }
    }

    const handleOpenCustom = () => setIsPaletteOpen(true)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleOpenCustom)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleOpenCustom)
    }
  }, [])

  // Check if current route is a dedicated project case study subpage
  const projectSlugMatch = currentPath.match(/\/projects\/([a-zA-Z0-9_-]+)/)
  const currentSlug = projectSlugMatch ? projectSlugMatch[1] : null
  const activeSubpageProject = currentSlug
    ? projects.find((p) => {
        const slug = currentSlug.toLowerCase()
        if (p.slug.toLowerCase() === slug || p.id.toLowerCase() === slug) return true
        if (p.slug.toLowerCase().includes(slug) || slug.includes(p.slug.toLowerCase())) return true
        if (slug === 'ledgerflow' && p.slug.includes('ledgerflow')) return true
        if (slug === 'docagent' && p.slug.includes('docagent')) return true
        if (slug === 'clinicflow' && p.slug.includes('clinicflow')) return true
        if (slug === 'sage' && p.slug.includes('sage')) return true
        if (slug === 'aviate' && p.slug.includes('aviate')) return true
        return false
      })
    : null

  const handleBackToOverview = () => {
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new Event('popstate'))
  }

  const isInvalidRoute =
    Boolean(currentSlug && !activeSubpageProject) ||
    Boolean(
      currentPath !== '/' &&
      !currentPath.startsWith('/#') &&
      !currentPath.startsWith('#') &&
      !currentPath.includes('/projects/')
    )

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white relative">
      <AnimatePresence mode="wait">
        {isInvalidRoute ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <NotFound onBackHome={handleBackToOverview} />
          </motion.div>
        ) : activeSubpageProject ? (
          <motion.div
            key={`subpage-${activeSubpageProject.slug}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <ProjectSubpage project={activeSubpageProject} onBack={handleBackToOverview} />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Navbar />
            <main className="relative">
              <Hero />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </div>
  )
}
