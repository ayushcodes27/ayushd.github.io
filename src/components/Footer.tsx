export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/80 py-8 text-xs font-mono text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          © 2026 Ayush Deore <span className="text-zinc-300 mx-2">•</span> Built with React & Tailwind CSS
        </div>

        <div className="flex items-center gap-4 text-zinc-600 font-medium">
          <a
            href="https://github.com/ayushcodes27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-300">•</span>
          <a
            href="https://www.linkedin.com/in/ayushdeore23"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-300">•</span>
          <a
            href="mailto:deoreayush555@gmail.com"
            className="hover:text-zinc-950 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
