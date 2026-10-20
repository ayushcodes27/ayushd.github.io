import { Mail, ArrowDownRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function HeroBento() {
  return (
    <div className="w-full mt-10 pt-8 border-t-2 border-black/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4">
        
        {/* Availability & Engineering Focus Card */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-tight">
              AVAILABLE FOR ROLES
            </span>
          </div>
          <div className="font-display font-black text-sm uppercase text-black">
            BACKEND & DISTRIBUTED SYSTEMS DEVELOPER
          </div>
          <div className="text-[11px] font-mono text-zinc-600 mt-1">
            Java 21 • Spring Boot • Python • Kafka • Redis • Agentic AI
          </div>
        </div>

        {/* Direct Email Card */}
        <a
          href="mailto:deoreayush555@gmail.com"
          className="lg:col-span-3 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between group"
          title="Send email"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              EMAIL CHANNEL
            </span>
            <Mail className="w-4 h-4 text-black group-hover:text-[#00f0ff] transition-colors" />
          </div>
          <div className="font-mono font-bold text-xs text-black truncate mt-2">
            Send Direct Message
          </div>
          <div className="text-[10px] font-mono text-zinc-500 mt-1">
            Click to send email
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href="https://github.com/ayushcodes27"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-2 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between group"
          title="GitHub Profile"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
              GITHUB
            </span>
            <GithubIcon className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono font-bold text-xs text-black mt-2">
            View Repositories
          </div>
          <div className="text-[10px] font-mono text-zinc-500 mt-1">
            05 Open Repos
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href="https://www.linkedin.com/in/ayushdeore23"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-2 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between group"
          title="LinkedIn Profile"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
              LINKEDIN
            </span>
            <LinkedinIcon className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono font-bold text-xs text-black mt-2">
            Connect via Profile
          </div>
          <div className="text-[10px] font-mono text-zinc-500 mt-1">
            Professional Network
          </div>
        </a>

      </div>
    </div>
  )
}
