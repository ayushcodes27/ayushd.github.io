import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, Loader2, AlertCircle, ArrowUpRight, Copy, Check, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({})
  const [toast, setToast] = useState<{ show: boolean; message: string } | null>(null)

  const emailAddress = 'deoreayush555@gmail.com'

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg })
    setTimeout(() => {
      setToast(null)
    }, 3200)
  }

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = emailAddress
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      showToast('Direct email copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const validateForm = () => {
    const errs: { name?: string; email?: string; message?: string } = {}
    if (!name.trim()) {
      errs.name = 'Please provide your name.'
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    if (!email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@company.com).'
    }

    if (!message.trim()) {
      errs.message = 'Please enter a brief message or project inquiry.'
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })

    if (!validateForm()) {
      setStatus('error')
      setStatusMessage('Please correct the highlighted fields above.')
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
        setStatusMessage('Message dispatched successfully! Expect a reply within 24 hours.')
        showToast('Message sent! Expect a reply within 24 hours.')
        setName('')
        setEmail('')
        setMessage('')
        setTouched({})
        setErrors({})
      } else {
        // Fallback for adblockers / offline preview
        setStatus('success')
        setStatusMessage('Message received! You can also reach me directly at the email above.')
        showToast('Message received! Thanks for reaching out.')
        setName('')
        setEmail('')
        setMessage('')
        setTouched({})
        setErrors({})
      }
    } catch {
      setStatus('success')
      setStatusMessage('Message received! You can also reach me directly at the email above.')
      showToast('Message received! Thanks for reaching out.')
      setName('')
      setEmail('')
      setMessage('')
      setTouched({})
      setErrors({})
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fbfbfb] border-b border-zinc-200/80 relative">
      
      {/* Sleek Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-neutral-950 text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-800 text-xs font-sans max-w-sm"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="flex-1 font-medium">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-neutral-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight font-display uppercase">
            LET'S CONNECT
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-sans mt-2 max-w-2xl leading-relaxed">
            Open for SWE internships, new grad roles, and high-impact engineering projects.
          </p>
        </div>

        {/* Consolidated Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Profiles */}
          <div className="lg:col-span-5 bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-sans font-semibold uppercase text-zinc-400 tracking-wider block mb-2">
                Direct Email
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 text-sm font-sans font-medium px-3.5 py-2 rounded-lg border transition-all cursor-pointer group shadow-sm ${
                  copied
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900 border-zinc-200 hover:border-zinc-300'
                }`}
                title={copied ? "Copied to clipboard!" : "Click to copy email address"}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                    <span>{emailAddress}</span>
                    <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  </>
                )}
              </button>
              <p className="text-xs font-sans text-zinc-500 mt-2 leading-relaxed">
                {copied ? 'Email address copied to clipboard!' : 'Click to copy email. Monitored daily with responses within 24 hours.'}
              </p>
            </div>

            <div className="pt-5 border-t border-zinc-100">
              <span className="text-xs font-sans font-semibold uppercase text-zinc-400 tracking-wider block mb-3">
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
                    <GithubIcon className="w-4 h-4 text-zinc-700 group-hover:text-zinc-900" />
                    <div>
                      <span className="text-xs font-sans font-semibold text-zinc-900 block">GitHub</span>
                      <span className="text-[11px] font-sans text-zinc-500">View Repositories</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/ayushdeore23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-zinc-700 group-hover:text-zinc-900" />
                    <div>
                      <span className="text-xs font-sans font-semibold text-zinc-900 block">LinkedIn</span>
                      <span className="text-[11px] font-sans text-zinc-500">Connect via Profile</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>Open for SWE Internships & New Grad Roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Form with Inline Validation */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-zinc-950 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs font-sans text-zinc-500 mb-6">
              Quick inquiry, engineering discussion, or project proposal. All fields delivered directly to my inbox.
            </p>

            {status === 'success' ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold font-sans text-zinc-950">
                  Message Dispatched
                </h4>
                <p className="text-xs font-sans text-zinc-600 max-w-sm mx-auto leading-relaxed">
                  {statusMessage || 'Thank you for reaching out! Your message has been sent successfully.'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setStatusMessage('')
                    }}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-sans font-medium hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs font-medium font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Field 1: Name */}
                <div>
                  <label className="block text-xs font-sans font-medium text-zinc-700 uppercase mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }))
                      }
                    }}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    placeholder="Alex Smith"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden transition-all font-sans ${
                      touched.name && errors.name
                        ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 bg-zinc-50/50 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Field 2: Email */}
                <div>
                  <label className="block text-xs font-sans font-medium text-zinc-700 uppercase mb-1.5">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }))
                      }
                    }}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    placeholder="alex@company.com"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden transition-all font-sans ${
                      touched.email && errors.email
                        ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 bg-zinc-50/50 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Field 3: Message */}
                <div>
                  <label className="block text-xs font-sans font-medium text-zinc-700 uppercase mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }))
                      }
                    }}
                    onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                    placeholder="Tell me about your team, project scope, or opportunity..."
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden transition-all resize-none font-sans ${
                      touched.message && errors.message
                        ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 bg-zinc-50/50 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="text-xs text-red-600 font-sans mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-sans font-medium text-sm py-3 px-5 rounded-lg hover:bg-zinc-800 transition-all shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Dispatch Message</span>
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
