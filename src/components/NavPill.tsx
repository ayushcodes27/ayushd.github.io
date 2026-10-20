import { useState, useEffect } from 'react'
import { Home, Cpu, FolderGit2, Mail } from 'lucide-react'

export default function NavPill() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  const navItems = [
    { id: 'hero', num: '01', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'skills', num: '02', label: 'Skills', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'projects', num: '03', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { id: 'contact', num: '04', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'contact']
      const scrollY = window.scrollY + 250

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-fit pointer-events-auto">
      <nav className="bg-white/95 backdrop-blur-md border-2 border-black p-1.5 flex items-center gap-1 shadow-[5px_5px_0px_#000]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                isActive
                  ? 'bg-black text-[#00f0ff] shadow-[2px_2px_0px_#00f0ff]'
                  : 'text-zinc-800 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              {item.icon}
              <span className="text-[10px] text-zinc-400 group-hover:text-black">{item.num}.</span>
              <span className="hidden sm:inline uppercase">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
