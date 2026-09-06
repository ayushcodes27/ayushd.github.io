import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsGlobe from './components/SkillsGlobe'
import Projects from './components/Projects'
// import About from './components/About' // Currently commented out as requested
import Contact from './components/Contact'
import Footer from './components/Footer'
import NavPill from './components/NavPill'

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white relative">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative">
        <Hero />
        <SkillsGlobe />
        <Projects />
        {/* <About /> */}
        <Contact />
      </main>

      {/* Footer Colophon */}
      <Footer />

      {/* Floating Bottom Pill Nav */}
      <NavPill />
    </div>
  )
}
