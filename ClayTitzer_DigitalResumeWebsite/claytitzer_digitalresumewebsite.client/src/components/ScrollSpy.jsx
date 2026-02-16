import { useEffect, useState, useCallback } from 'react'

export default function ScrollSpy({ sections = [] }) {
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const p = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0
    setProgress(p)

    const sectionBreaks = sections.map((_, i) => i / sections.length)
    for (let i = sectionBreaks.length - 1; i >= 0; i--) {
      if (p >= sectionBreaks[i] - 0.05) {
        setActiveIndex(i)
        break
      }
    }
  }, [sections])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      <div className="relative w-px h-48 bg-divider/50 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-accent rounded-full transition-all duration-150"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between items-center py-0">
        {sections.map((label, i) => (
          <div key={i} className="group relative flex items-center">
            <div
              className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-200 ${
                i === activeIndex
                  ? 'bg-accent border-accent scale-125'
                  : i < activeIndex
                    ? 'bg-accent/40 border-accent/40'
                    : 'bg-offwhite border-divider'
              }`}
            />
            <span className="absolute right-6 whitespace-nowrap font-mono text-[10px] tracking-wider uppercase text-slate opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-offwhite/90 px-2 py-0.5 rounded">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
