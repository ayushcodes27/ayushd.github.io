import React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: React.ReactNode
  className?: string
}

export default function Link({ href, children, className, onClick, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }


    // Handle internal routing without page reloads
    if (!e.defaultPrevented && !href.startsWith('http') && !href.startsWith('mailto:') && !e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      window.history.pushState({}, '', href)
      window.dispatchEvent(new Event('popstate'))

      // If linking to anchor on home, smoothly scroll
      if (href.includes('#')) {
        const hash = href.split('#')[1]
        const target = document.getElementById(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
