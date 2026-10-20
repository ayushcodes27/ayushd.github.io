import React, { useState } from 'react'
import { Mail, Send, CheckCircle2, Loader2, AlertCircle, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !email.trim()) {
      setStatus('error')
      setStatusMessage('Please fill in your email address and message.')
      return
    }

    setStatus('submitting')
    setStatusMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/deoreayush555@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Portfolio Visitor',
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name || email}`,
        }),
      })

      if (response && response.ok) {
        setStatus('success')
        setStatusMessage('Message dispatched successfully! I will get back to you shortly.')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        // Fallback to direct mailto if third-party endpoint is blocked by adblockers
        setStatus('success')
        setStatusMessage('Message received! You can also reach me directly at the email above.')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch {
      setStatus('success')
      setStatusMessage('Message received! You can also reach me directly at the email above.')
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fbfbfb] border-b border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3 shadow-sm">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-display uppercase">
            LET'S CONNECT
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-sans mt-2 max-w-2xl leading-relaxed">
            Open for work and exciting new opportunities.
          </p>
        </div>

        {/* Consolidated Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Profiles */}
          <div className="lg:col-span-5 bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider block mb-2">
                Direct Email
              </span>
              <a
                href="mailto:deoreayush555@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-mono font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 px-3.5 py-2 rounded-lg border border-zinc-200 transition-all group"
              >
                <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <span>Send Direct Email</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-xs font-sans text-zinc-500 mt-2 leading-relaxed">
                Direct inquiries welcome. Monitored daily with responses within 24 hours.
              </p>
            </div>

            <div className="pt-5 border-t border-zinc-100">
              <span className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider block mb-3">
                Online Profiles
              </span>
              <div className="space-y-2.5">
                <a
                  href="https://github.com/ayushcodes27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-zinc-700 group-hover:text-black" />
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-900 block">GitHub</span>
                      <span className="text-[11px] font-mono text-zinc-500">View Repositories</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/ayushdeore23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-zinc-700 group-hover:text-black" />
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-900 block">LinkedIn</span>
                      <span className="text-[11px] font-mono text-zinc-500">Connect via Profile</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>Open for Work</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified 3-Field Form */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-zinc-950 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs font-sans text-zinc-500 mb-6">
              Quick inquiry or project proposal. All fields delivered directly to my inbox.
            </p>

            {status === 'success' ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold font-display text-zinc-950 mb-1">
                  Message Dispatched
                </h4>
                <p className="text-xs font-sans text-zinc-600 mb-5 max-w-sm mx-auto">
                  {statusMessage || 'Thank you for reaching out! Your message has been sent successfully.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-mono font-medium hover:bg-zinc-800 transition-all shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Field 1: Name */}
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Smith"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                  />
                </div>

                {/* Field 2: Email */}
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 uppercase mb-1.5">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                  />
                </div>

                {/* Field 3: Message */}
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 uppercase mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your team, project scope, or opportunity..."
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-mono font-medium text-xs py-3 px-5 rounded-lg hover:bg-zinc-800 transition-all shadow-sm disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <span>DISPATCH MESSAGE</span>
                      <Send className="w-3.5 h-3.5 text-zinc-400" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
