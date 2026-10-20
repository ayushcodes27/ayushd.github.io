import React from 'react'

export function TechIcon({ name, className = "w-3.5 h-3.5" }: { name: string; className?: string }) {
  const normalized = name.toLowerCase()

  if (normalized.includes('java 21') || normalized === 'java') {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#5382A1" d="M8.86 16.5c-2.3 0-4.1-1.3-4.1-2.9 0-.4.1-.7.4-1 .3.4.8.8 1.4 1 1 .5 2.5.7 4 .6.6 0 1.2-.1 1.7-.2.2.4.3.8.3 1.2 0 1.6-1.8 2.9-4.1 2.9z" />
        <path fill="#E76F00" d="M14.6 11.2c.4 1.1-.3 2.1-1.6 2.5-1.4.4-2.8-.2-3.2-1.3-.4-1.1.3-2.1 1.6-2.5 1.4-.4 2.8.2 3.2 1.3z" />
        <path fill="#5382A1" d="M19.3 15.6c-.6.9-1.9 1.5-3.4 1.8.8-.4 1.4-.9 1.8-1.5.5-.8.5-1.7.1-2.5 1.1.6 1.8 1.4 1.5 2.2z" />
        <path fill="#E76F00" d="M9.8 4.2C8.6 5.8 9.3 7.6 11 8.8c.8.6 1.9.9 3 .9.1-.4.1-.8 0-1.2-.6-1.5-2.2-2.8-4.2-4.3z" />
      </svg>
    )
  }

  if (normalized.includes('spring boot')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#6DB33F" d="M21.2 14.7c-.5 3.3-3.2 5.9-6.6 6.2-4.1.4-7.7-2.6-8.2-6.6-.5-4.2 2.5-7.9 6.7-8.3 1.3-.1 2.5.2 3.6.8l-1.8 1.8c-.5-.3-1.1-.4-1.7-.4-2.7.2-4.7 2.6-4.4 5.3.2 2.5 2.3 4.5 4.8 4.5 2.8 0 5-2.1 5.1-4.9h-4.8v-2.5h7.3c.1.7.2 1.4.1 2.1z" />
      </svg>
    )
  }

  if (normalized.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#3776AB" d="M11.91 0c-5.46 0-5.11 2.37-5.11 2.37l.01 2.46h5.2v.74H4.72S1.35 5.17 1.35 10.63c0 5.47 2.94 5.29 2.94 5.29h1.75v-2.45s-.1-2.94 2.88-2.94h4.98s2.81.05 2.81-2.73V3.12S17.07 0 11.91 0zm-2.85 1.54a.97.97 0 1 1 0 1.94.97.97 0 0 1 0-1.94z" />
        <path fill="#FFD438" d="M12.09 24c5.46 0 5.11-2.37 5.11-2.37l-.01-2.46h-5.2v-.74h7.29s3.37.4 3.37-5.06c0-5.47-2.94-5.29-2.94-5.29h-1.75v2.45s.1 2.94-2.88 2.94h-4.98s-2.81-.05-2.81 2.73v5.67S6.93 24 12.09 24zm2.85-1.54a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94z" />
      </svg>
    )
  }

  if (normalized.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path fill="#FFFFFF" d="M12.24 13.9h-3.1v7.62H6.5v-7.62H3.4V11.4h8.84v2.5zm9.36 4.3c-.45 1.9-2.03 3.3-4.5 3.3-3.23 0-4.97-1.93-4.97-4.57 0-2.8 1.93-4.53 4.88-4.53 1.63 0 2.9.55 3.73 1.43l-1.68 1.63c-.58-.57-1.3-.9-2.05-.9-1.38 0-2.25.87-2.25 2.37 0 1.43.83 2.37 2.3 2.37.85 0 1.48-.3 1.95-.77v-1.12h-2.15v-2.07h4.74v2.88z" />
      </svg>
    )
  }

  if (normalized.includes('kafka')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="9" fill="#231F20" stroke="#E11D48" strokeWidth="2" />
        <path d="M12 6v12M8 9l8 6M8 15l8-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (normalized.includes('redis')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#DC382D" d="M21.5 7.5L12 2 2.5 7.5l9.5 5.5 9.5-5.5zM2.5 16.5L12 22l9.5-5.5-9.5-5.5-9.5 5.5z" />
      </svg>
    )
  }

  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  }

  if (normalized.includes('duckdb')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="10" fill="#FFF000" />
        <path d="M12 6c-2.5 0-4.5 1.8-4.5 4 0 1.2.6 2.3 1.5 3-.9.7-1.5 1.8-1.5 3 0 2.2 2 4 4.5 4s4.5-1.8 4.5-4c0-1.2-.6-2.3-1.5-3 .9-.7 1.5-1.8 1.5-3 0-2.2-2-4-4.5-4z" fill="#000000" />
      </svg>
    )
  }

  if (normalized.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#2496ED" d="M13.98 11.08h-2.1v-2.1h2.1v2.1zm-2.64 0h-2.1v-2.1h2.1v2.1zm5.28 0h-2.1v-2.1h2.1v2.1zm-7.92 0H6.6v-2.1h2.1v2.1zm5.28-2.64h-2.1V6.34h2.1v2.1zm-2.64 0h-2.1V6.34h2.1v2.1zm5.28 0h-2.1V6.34h2.1v2.1zm-2.64-2.64h-2.1V3.7h2.1v2.1zm9.86 6.94c-.45-.3-1.42-.37-2.17-.18-.34-.73-1.04-1.34-1.92-1.63l-.44-.14-.28.37c-.6.79-.9 1.83-.87 2.88.02.5.15.98.37 1.42-1.02.55-2.22.86-3.48.86H4.25c-.27 0-.53.02-.79.06-.54.08-1.57.36-2.12 1.15-.36.52-.43 1.12-.2 1.7.35.88 1.25 1.48 2.28 1.48h13.2c2.97 0 5.6-1.5 6.78-3.87.52-1.05.65-2.23.36-3.32-.1-.38-.28-.75-.5-1.08z" />
      </svg>
    )
  }

  if (normalized.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="11" fill="#05998B" />
        <path fill="#FFFFFF" d="M12.8 4L6.5 13.5h4.8L9.8 20l7.7-9.5h-4.7z" />
      </svg>
    )
  }

  if (normalized.includes('langgraph')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#0F172A" />
        <circle cx="6" cy="6" r="2.5" fill="#38BDF8" />
        <circle cx="18" cy="8" r="2.5" fill="#A855F7" />
        <circle cx="12" cy="18" r="2.5" fill="#34D399" />
        <path d="M6 6L18 8M6 6L12 18M18 8L12 18" stroke="#94A3B8" strokeWidth="1.5" />
      </svg>
    )
  }

  if (normalized.includes('airflow')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#017CEE" />
        <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
      </svg>
    )
  }

  if (normalized.includes('dbt')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#FF694B" />
        <path d="M7 7h10v10H7z" fill="#FFFFFF" />
      </svg>
    )
  }

  if (normalized.includes('go')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#00ADD8" />
        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">GO</text>
      </svg>
    )
  }

  if (normalized.includes('c++') || normalized.includes('c / c++')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#00599C" />
        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">C++</text>
      </svg>
    )
  }

  if (normalized.includes('aws')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="4" fill="#232F3E" />
        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fill="#FF9900" fontSize="9" fontWeight="bold" fontFamily="monospace">AWS</text>
      </svg>
    )
  }

  if (normalized.includes('git')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#F05032" d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.124 0L8.835 2.56l3.356 3.356a1.777 1.777 0 0 1 2.247 2.26l3.23 3.23a1.777 1.777 0 1 1-1.077 1.053l-3.033-3.033v4.612a1.778 1.778 0 1 1-1.5 0v-4.73a1.776 1.776 0 0 1-.954-2.31L7.753 3.642.454 10.94a1.5 1.5 0 0 0 0 2.124l10.479 10.48a1.5 1.5 0 0 0 2.124 0l10.489-10.49a1.5 1.5 0 0 0 0-2.124z" />
      </svg>
    )
  }

  // Default clean geometric indicator
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="7" fill="#0EA5E9" />
    </svg>
  )
}
