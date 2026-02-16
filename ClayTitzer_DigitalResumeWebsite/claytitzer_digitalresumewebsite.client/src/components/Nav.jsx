import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/career', label: 'Career' },
  { to: '/education', label: 'Education' },
  { to: '/skills', label: 'Skills' },
  { to: '/playbooks', label: 'Playbooks' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [expanded, setExpanded] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-all duration-200 no-underline px-3 py-1.5 rounded-full ${
      isActive
        ? 'bg-accent text-white font-medium'
        : 'text-slate hover:text-charcoal hover:bg-charcoal/5'
    }`

  useEffect(() => {
    if (!expanded) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setExpanded(false)
    }

    const closeOnOutsideClick = (event) => {
      const target = event.target
      if (menuRef.current?.contains(target)) return
      if (toggleRef.current?.contains(target)) return
      setExpanded(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('mousedown', closeOnOutsideClick)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('mousedown', closeOnOutsideClick)
    }
  }, [expanded])

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      role="navigation"
      aria-label="Primary navigation"
    >
      <div
        data-testid="desktop-nav"
        className="hidden md:flex items-center gap-1 bg-offwhite/80 backdrop-blur-xl border border-divider/50 rounded-full px-2 py-2 shadow-lg"
      >
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
            {label}
          </NavLink>
        ))}
        <div className="w-px h-5 bg-divider/40 mx-1" />
        <ThemeToggle />
      </div>

      <div data-testid="mobile-nav" className="md:hidden">
        {expanded && (
          <div
            id="mobile-nav-menu"
            ref={menuRef}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-offwhite/95 backdrop-blur-xl border border-divider/50 rounded-2xl p-3 shadow-lg min-w-[200px] animate-[fade-in-up_0.2s_ease-out]"
          >
            <ul className="list-none m-0 p-0 space-y-1">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block text-sm tracking-wide no-underline px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-accent text-white font-medium'
                          : 'text-slate hover:text-charcoal hover:bg-charcoal/5'
                      }`
                    }
                    onClick={() => setExpanded(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-1 bg-offwhite/80 backdrop-blur-xl border border-divider/50 rounded-full px-2 py-2 shadow-lg">
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setExpanded(false)}
          >
            Home
          </NavLink>
          <button
            ref={toggleRef}
            onClick={() => setExpanded((o) => !o)}
            aria-label={expanded ? 'Close menu' : 'Open menu'}
            aria-expanded={expanded}
            aria-controls="mobile-nav-menu"
            className="text-sm tracking-wide px-3 py-1.5 rounded-full text-slate hover:text-charcoal hover:bg-charcoal/5 transition-all duration-200 cursor-pointer bg-transparent border-none"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {expanded ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
                </>
              )}
            </svg>
          </button>
          <div className="w-px h-5 bg-divider/40 mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
