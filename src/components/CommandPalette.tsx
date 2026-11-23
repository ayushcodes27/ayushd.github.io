import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FolderGit2, Compass, Mail, FileText, Check, ExternalLink, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { projects } from '../data/projects'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Projects' | 'Navigation' | 'Actions'
  icon: any
  action: () => void
  keywords?: string[]
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Navigate to project internal URL
  const navigateTo = (path: string) => {
    onClose()
    if (path.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', `/${path}`)
        window.dispatchEvent(new Event('popstate'))
      } else {
        const el = document.getElementById(path.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new Event('popstate'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('ayushdeore23@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => {
      setCopiedEmail(false)
      onClose()
    }, 1200)
  }

  const items: CommandItem[] = [
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      subtitle: `${p.category} • ${p.keyMetric}`,
      category: 'Projects' as const,
      icon: FolderGit2,
      keywords: [p.slug, p.category, ...p.tags],
      action: () => navigateTo(`/projects/${p.slug}`),
    })),
    // Navigation
    {
      id: 'nav-home',
      title: 'Home',
      subtitle: 'Hero & Introduction',
      category: 'Navigation',
      icon: Compass,
      keywords: ['hero', 'start', 'top'],
      action: () => navigateTo('#hero'),
    },
    {
      id: 'nav-projects',
      title: 'Selected Work',
      subtitle: 'Featured Systems & Projects',
      category: 'Navigation',
      icon: Compass,
      keywords: ['portfolio', 'work', 'code'],
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      subtitle: 'Get in touch & direct email',
      category: 'Navigation',
      icon: Compass,
      keywords: ['email', 'reach out', 'message'],
      action: () => navigateTo('#contact'),
    },
    // Actions
    {
      id: 'act-email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Direct Email',
      subtitle: 'ayushdeore23@gmail.com',
      category: 'Actions',
      icon: copiedEmail ? Check : Mail,
      keywords: ['mail', 'gmail', 'contact'],
      action: copyEmail,
    },
    {
      id: 'act-resume',
      title: 'View Resume ↗',
      subtitle: 'Open resume.pdf in new tab',
      category: 'Actions',
      icon: FileText,
      keywords: ['cv', 'resume', 'pdf'],
      action: () => {
        window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
    {
      id: 'act-github',
      title: 'GitHub Profile ↗',
      subtitle: 'github.com/ayushcodes27',
      category: 'Actions',
      icon: GithubIcon,
      keywords: ['git', 'code', 'repositories'],
      action: () => {
        window.open('https://github.com/ayushcodes27', '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
    {
      id: 'act-linkedin',
      title: 'LinkedIn Profile ↗',
      subtitle: 'linkedin.com/in/ayushdeore23',
      category: 'Actions',
      icon: LinkedinIcon,
      keywords: ['network', 'connect'],
      action: () => {
        window.open('https://www.linkedin.com/in/ayushdeore23', '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
  ]

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
    )
  })

  // Reset selectedIndex on query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl border border-neutral-200/90 bg-white/95 shadow-2xl backdrop-blur-xl overflow-hidden font-sans"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, project, or search..."
                className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden font-sans"
              />
              <kbd className="hidden sm:inline-flex text-[10px] font-mono text-neutral-400 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded shadow-2xs">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400 font-sans">
                  No matching results found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = selectedIndex === idx
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-100 text-neutral-950 font-medium'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-xs sm:text-sm leading-tight truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-neutral-400 truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 hidden sm:inline">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-900" />
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer keyboard hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-100 bg-neutral-50/50 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[10px] text-neutral-400">⌘K Quick Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
