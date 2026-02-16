import { useMemo, useState } from 'react'
import BackLink from '../components/BackLink'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import { playbooks } from '../data/resume'

const ALL = 'All'

export default function Playbooks() {
  const [query, setQuery] = useState('')
  const [activePhase, setActivePhase] = useState(ALL)

  const phases = useMemo(
    () => [ALL, ...new Set(playbooks.map((item) => item.phase))],
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return playbooks.filter((item) => {
      const phaseMatch = activePhase === ALL || item.phase === activePhase
      if (!phaseMatch) return false
      if (!q) return true

      const haystack = `${item.name} ${item.summary} ${item.domain} ${item.tools.join(' ')} ${item.outcome}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [query, activePhase])

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-28">
      <BackLink />
      <PageHeader label="Patterns" title="Automation Playbooks" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <label className="sr-only" htmlFor="playbook-search">Search playbooks</label>
        <input
          id="playbook-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search phase, tools, or outcomes..."
          className="glow-input w-full md:max-w-md px-4 py-2.5 text-sm text-charcoal bg-transparent border border-divider/60 rounded-lg outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`cursor-pointer border-none rounded-full px-3 py-1.5 text-xs font-mono tracking-wide transition-colors duration-200 ${
                phase === activePhase
                  ? 'bg-accent text-white'
                  : 'bg-offwhite text-slate hover:text-charcoal hover:bg-charcoal/5'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate">No playbooks match that filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 70} variant="fade-up">
              <article className="bento-card playbook-card p-5 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold m-0">{item.name}</h2>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {item.phase}
                  </span>
                </div>

                <p className="text-sm text-charcoal/75 leading-relaxed mt-3 mb-4">{item.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tools.map((tool) => (
                    <span key={`${item.name}-${tool}`} className="text-xs px-2 py-1 rounded-full border border-divider text-slate">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-2">
                  <p className="text-xs font-mono uppercase tracking-widest text-slate m-0">{item.domain}</p>
                  <p className="text-xs text-charcoal/70 leading-relaxed m-0">{item.outcome}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
