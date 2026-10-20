import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsGlobe from './components/SkillsGlobe'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectSubpage from './components/ProjectSubpage'
import { projects } from './data/projects'

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || window.location.hash : '/'
  )

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

  useEffect(() => {
    const handleLocationChange = () => {
      // Support standard pathname /projects/[slug] or hash #/projects/[slug]
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
    window.history.pushState({}, '', '/#projects')
    window.dispatchEvent(new Event('popstate'))
  }

  // Render dedicated subpage if routed to /projects/[slug]
  if (activeSubpageProject) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
        <ProjectSubpage project={activeSubpageProject} onBack={handleBackToOverview} />
        <Footer />
      </div>
    )
  }

  // Standard Main Portfolio Overview
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white relative">
      {/* Sleek Top Sticky Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative">
        <Hero />
        {/* <SkillsGlobe /> (Removed for now per user request) */}
        <Projects />
        <Contact />
      </main>

      {/* 1-Line Minimal Footer Framing */}
      <Footer />
    </div>
  )
}
