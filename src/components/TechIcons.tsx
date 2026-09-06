import React from 'react'

export function TechIcon({ name, className = "w-3.5 h-3.5" }: { name: string; className?: string }) {
  switch (name) {
    case 'Java':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#5382A1" d="M8.86 16.5c-2.3 0-4.1-1.3-4.1-2.9 0-.4.1-.7.4-1 .3.4.8.8 1.4 1 1 .5 2.5.7 4 .6.6 0 1.2-.1 1.7-.2.2.4.3.8.3 1.2 0 1.6-1.8 2.9-4.1 2.9z" />
          <path fill="#E76F00" d="M14.6 11.2c.4 1.1-.3 2.1-1.6 2.5-1.4.4-2.8-.2-3.2-1.3-.4-1.1.3-2.1 1.6-2.5 1.4-.4 2.8.2 3.2 1.3z" />
          <path fill="#5382A1" d="M19.3 15.6c-.6.9-1.9 1.5-3.4 1.8.8-.4 1.4-.9 1.8-1.5.5-.8.5-1.7.1-2.5 1.1.6 1.8 1.4 1.5 2.2z" />
          <path fill="#E76F00" d="M9.8 4.2C8.6 5.8 9.3 7.6 11 8.8c.8.6 1.9.9 3 .9.1-.4.1-.8 0-1.2-.6-1.5-2.2-2.8-4.2-4.3z" />
        </svg>
      )
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3776AB" d="M11.91 0c-5.46 0-5.11 2.37-5.11 2.37l.01 2.46h5.2v.74H4.72S1.35 5.17 1.35 10.63c0 5.47 2.94 5.29 2.94 5.29h1.75v-2.45s-.1-2.94 2.88-2.94h4.98s2.81.05 2.81-2.73V3.12S17.07 0 11.91 0zm-2.85 1.54a.97.97 0 1 1 0 1.94.97.97 0 0 1 0-1.94z" />
          <path fill="#FFD438" d="M12.09 24c5.46 0 5.11-2.37 5.11-2.37l-.01-2.46h-5.2v-.74h7.29s3.37.4 3.37-5.06c0-5.47-2.94-5.29-2.94-5.29h-1.75v2.45s.1 2.94-2.88 2.94h-4.98s-2.81-.05-2.81 2.73v5.67S6.93 24 12.09 24zm2.85-1.54a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94z" />
        </svg>
      )
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path fill="#FFFFFF" d="M12.24 13.9h-3.1v7.62H6.5v-7.62H3.4V11.4h8.84v2.5zm9.36 4.3c-.45 1.9-2.03 3.3-4.5 3.3-3.23 0-4.97-1.93-4.97-4.57 0-2.8 1.93-4.53 4.88-4.53 1.63 0 2.9.55 3.73 1.43l-1.68 1.63c-.58-.57-1.3-.9-2.05-.9-1.38 0-2.25.87-2.25 2.37 0 1.43.83 2.37 2.3 2.37.85 0 1.48-.3 1.95-.77v-1.12h-2.15v-2.07h4.74v2.88z" />
        </svg>
      )
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path fill="#000000" d="M7.5 19.5c-.8 0-1.6-.3-2.1-.9l1.4-1.4c.3.3.5.5.8.5.4 0 .7-.2.7-.8v-5.4h2.2v5.4c0 1.8-1.1 2.6-3 2.6zm8.8 0c-2.3 0-3.6-1.2-3.6-3.1 0-2 1.3-3.1 3.4-3.1.7 0 1.3.1 1.8.4l-.6 1.6c-.4-.2-.8-.3-1.2-.3-1 0-1.5.5-1.5 1.3 0 .8.5 1.3 1.5 1.3.4 0 .9-.1 1.3-.4l.6 1.6c-.5.5-1.1.7-1.7.7z" />
        </svg>
      )
    case 'React':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="2.4" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="1.6">
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
        </svg>
      )
    case 'LangChain':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#1C3C3C" />
          <circle cx="8" cy="12" r="3" fill="#10B981" />
          <circle cx="16" cy="12" r="3" fill="#00F0FF" />
          <path d="M8 12h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'LangGraph':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#0F172A" />
          <circle cx="6" cy="6" r="2.5" fill="#38BDF8" />
          <circle cx="18" cy="8" r="2.5" fill="#A855F7" />
          <circle cx="12" cy="18" r="2.5" fill="#34D399" />
          <path d="M6 6L18 8M6 6L12 18M18 8L12 18" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      )
    case 'FastAPI':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="11" fill="#05998B" />
          <path fill="#FFFFFF" d="M12.8 4L6.5 13.5h4.8L9.8 20l7.7-9.5h-4.7z" />
        </svg>
      )
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#2496ED" d="M13.98 11.08h-2.1v-2.1h2.1v2.1zm-2.64 0h-2.1v-2.1h2.1v2.1zm5.28 0h-2.1v-2.1h2.1v2.1zm-7.92 0H6.6v-2.1h2.1v2.1zm5.28-2.64h-2.1V6.34h2.1v2.1zm-2.64 0h-2.1V6.34h2.1v2.1zm5.28 0h-2.1V6.34h2.1v2.1zm-2.64-2.64h-2.1V3.7h2.1v2.1zm9.86 6.94c-.45-.3-1.42-.37-2.17-.18-.34-.73-1.04-1.34-1.92-1.63l-.44-.14-.28.37c-.6.79-.9 1.83-.87 2.88.02.5.15.98.37 1.42-1.02.55-2.22.86-3.48.86H4.25c-.27 0-.53.02-.79.06-.54.08-1.57.36-2.12 1.15-.36.52-.43 1.12-.2 1.7.35.88 1.25 1.48 2.28 1.48h13.2c2.97 0 5.6-1.5 6.78-3.87.52-1.05.65-2.23.36-3.32-.1-.38-.28-.75-.5-1.08z" />
        </svg>
      )
    case 'Vector DBs':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#4F46E5" />
          <path d="M6 18L18 6M6 6h12v12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      )
    case 'Redis':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#DC382D" d="M21.5 7.5L12 2 2.5 7.5l9.5 5.5 9.5-5.5zM2.5 16.5L12 22l9.5-5.5-9.5-5.5-9.5 5.5z" />
        </svg>
      )
    case 'Microservices':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="8" height="8" rx="2" fill="#0EA5E9" />
          <rect x="14" y="2" width="8" height="8" rx="2" fill="#6366F1" />
          <rect x="2" y="14" width="8" height="8" rx="2" fill="#10B981" />
          <rect x="14" y="14" width="8" height="8" rx="2" fill="#F59E0B" />
        </svg>
      )
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    case 'Git':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F05032" d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.124 0L8.835 2.56l3.356 3.356a1.777 1.777 0 0 1 2.247 2.26l3.23 3.23a1.777 1.777 0 1 1-1.077 1.053l-3.033-3.033v4.612a1.778 1.778 0 1 1-1.5 0v-4.73a1.776 1.776 0 0 1-.954-2.31L7.753 3.642.454 10.94a1.5 1.5 0 0 0 0 2.124l10.479 10.48a1.5 1.5 0 0 0 2.124 0l10.489-10.49a1.5 1.5 0 0 0 0-2.124z" />
        </svg>
      )
    case 'CI/CD':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="#22C55E" />
          <path d="M8 12l3 3 5-6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="8" fill="#00F0FF" />
        </svg>
      )
  }
}
