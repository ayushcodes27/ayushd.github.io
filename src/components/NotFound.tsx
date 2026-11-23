import Link from './Link'
import { ArrowLeft, Compass, FolderGit2 } from 'lucide-react'
import { projects } from '../data/projects'

export default function NotFound({ onBackHome }: { onBackHome?: () => void }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between p-6 sm:p-12 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link
          href="/"
          onClick={onBackHome}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-950 text-white font-bold text-xs flex items-center justify-center">
            AD
          </div>
          <span className="font-semibold text-sm tracking-tight text-neutral-900">
            ayushd.me
          </span>
        </Link>

        <span className="text-xs font-mono text-neutral-400">
          ERR_404_ROUTE_UNDEFINED
        </span>
      </div>

      {/* Center 404 Content */}
      <main className="max-w-xl mx-auto text-center space-y-6 my-auto py-16">
        <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>404 NOT FOUND</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-neutral-950 font-display">
          Route Not Found
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed">
          The requested system pathway does not exist, was moved, or never initialized.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/#projects"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-xs"
          >
            <Compass className="w-4 h-4 text-neutral-400" />
            <span>Explore Projects</span>
          </Link>
        </div>

        {/* Quick Project Shortcuts */}
        <div className="pt-8 border-t border-neutral-100 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3 text-center">
            Or jump directly to a system
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="p-2.5 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-xs font-medium text-neutral-800 block truncate"
              >
                <div className="font-semibold text-neutral-950 truncate">{p.title}</div>
                <div className="text-[10px] text-neutral-400 truncate">{p.keyMetric}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-neutral-400">
        ayushd.me • Backend &amp; Systems Engineer
      </footer>
    </div>
  )
}
