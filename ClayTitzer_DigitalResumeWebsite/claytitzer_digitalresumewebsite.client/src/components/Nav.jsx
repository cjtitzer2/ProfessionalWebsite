import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/career', label: 'Career' },
  { to: '/education', label: 'Education' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-offwhite/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-semibold text-charcoal tracking-tight text-lg group">
          <span className="text-accent">C</span>T
          <span className="inline-block w-0 group-hover:w-1.5 h-1.5 rounded-full bg-gold transition-all duration-300 ml-0 group-hover:ml-1" />
        </NavLink>
        <ul className="flex gap-8 list-none m-0 p-0">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors duration-200 no-underline ${
                    isActive
                      ? 'text-accent font-medium'
                      : 'text-slate hover:text-charcoal'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Top progress bar */}
      <div className="h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent to-gold transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </nav>
  )
}
