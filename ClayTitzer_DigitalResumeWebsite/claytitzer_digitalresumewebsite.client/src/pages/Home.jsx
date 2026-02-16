import { useState } from 'react'
import { Link } from 'react-router-dom'
import TypeWriter from '../components/TypeWriter'
import MarqueeStrip from '../components/MarqueeStrip'
import ParticleGrid from '../components/ParticleGrid'
import { experience, education, skills, contact, playbooks } from '../data/resume'

const current = experience[0] ?? null
const topSkills = (skills ?? []).flatMap((group) => group.items ?? []).slice(0, 6)
const educationItems = education ?? []
const contactLinks = contact?.links ?? []
const featuredPlaybook = playbooks[0] ?? null
const workflowStages = ['Trigger', 'Validate', 'Queue', 'Execute', 'Recover']
const workflowPrinciples = ['Exception-first design', 'Reusable components', 'Deterministic routing']

function BentoCard({ to, delay = 0, className = '', label = '', children }) {
  return (
    <Link
      to={to}
      aria-label={label || undefined}
      className={`bento-card bento-card-entrance block no-underline text-charcoal hover:text-charcoal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Link>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] text-accent tracking-widest uppercase m-0 mb-3">
      {children}
    </p>
  )
}

export default function Home() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(contact.email)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-28">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* Hero Card — spans 2 cols + 2 rows on desktop */}
        <div
          className="bento-card bento-card-entrance md:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] relative overflow-hidden"
          style={{ animationDelay: '0ms' }}
        >
          <ParticleGrid />
          <div className="relative z-10">
            <p className="font-mono text-[11px] text-accent tracking-widest uppercase m-0 mb-6">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight m-0">
              Clay
              <br />
              <span className="text-accent">Titzer</span>
            </h1>
            {current && (
              <p className="text-lg text-slate mt-3 mb-0 font-light">
                {current.title}
              </p>
            )}
          </div>
          <div className="mt-6 relative z-10">
            <p className="text-sm text-charcoal/60 leading-relaxed m-0 max-w-md">
              <TypeWriter
                text="Building enterprise automation systems from design to deployment. Turning manual processes into reliable, scalable workflows."
                delay={400}
              />
            </p>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-6 right-6 grid grid-cols-3 gap-1.5 opacity-20 z-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-accent" />
            ))}
          </div>
        </div>

        {/* Career Card — 1 col, 2 rows on desktop */}
        <BentoCard
          to="/career"
          delay={100}
          label="View career details"
          className="lg:row-span-2 flex flex-col justify-between"
        >
          <div>
            <SectionLabel>Career</SectionLabel>
            {current && (
              <>
                <h2 className="text-xl font-semibold m-0">{current.title}</h2>
                <p className="text-sm text-slate mt-1 mb-0">{current.subtitle}</p>
                <p className="font-mono text-xs text-accent/60 mt-1 mb-0">{current.dates}</p>
              </>
            )}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="text-xs text-slate">{experience.length} roles</span>
            <div className="flex gap-1">
              {experience.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-accent' : 'bg-divider'}`}
                />
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Education Card */}
        <BentoCard to="/education" delay={200} label="View education details">
          <SectionLabel>Education</SectionLabel>
          {educationItems.map((ed) => (
            <div key={ed.shortTitle} className="mb-3 last:mb-0">
              <p className="text-sm font-semibold m-0">{ed.shortTitle}</p>
              <p className="text-xs text-slate m-0">{ed.institution}</p>
            </div>
          ))}
        </BentoCard>

        {/* Skills Card */}
        <BentoCard to="/skills" delay={300} label="View skills details">
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {topSkills.map(({ name }) => (
              <span
                key={name}
                className="text-xs px-2.5 py-1 rounded-full border border-divider text-charcoal/70"
              >
                {name}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* About Card */}
        <BentoCard to="/about" delay={400} label="View about details">
          <SectionLabel>About</SectionLabel>
          <p className="text-sm text-charcoal/70 leading-relaxed m-0">
            Systems thinker focused on automation, orchestration, and building tools that eliminate
            repetitive work across the enterprise.
          </p>
        </BentoCard>

        {/* Playbooks Card */}
        <BentoCard to="/playbooks" delay={450} label="View playbooks details">
          <SectionLabel>Playbooks</SectionLabel>
          {featuredPlaybook ? (
            <>
              <p className="text-sm font-semibold m-0">{featuredPlaybook.name}</p>
              <p className="text-xs text-slate mt-1 mb-3">{featuredPlaybook.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {featuredPlaybook.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-divider text-slate"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate m-0">Playbooks coming soon.</p>
          )}
        </BentoCard>

        {/* Quick Actions Card */}
        <div className="bento-card bento-card-entrance" style={{ animationDelay: '475ms' }}>
          <SectionLabel>Quick Actions</SectionLabel>
          <div className="flex flex-col gap-2">
            <button
              onClick={copyEmail}
              className="cursor-pointer text-left text-xs px-3 py-2 rounded-lg border border-divider bg-transparent text-charcoal hover:border-accent/60 transition-colors duration-200"
            >
              {copied ? 'Email copied to clipboard' : 'Copy email'}
            </button>
            {contactLinks[0]?.url && (
              <a
                href={contactLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-2 rounded-lg border border-divider text-charcoal hover:border-accent/60 transition-colors duration-200 no-underline"
              >
                Open LinkedIn
              </a>
            )}
            <Link
              to="/playbooks"
              className="text-xs px-3 py-2 rounded-lg border border-divider text-charcoal hover:border-accent/60 transition-colors duration-200 no-underline"
            >
              Explore playbooks
            </Link>
          </div>
        </div>

        {/* Automation Pulse Card */}
        <div
          className="bento-card bento-card-entrance automation-pulse-card relative overflow-hidden"
          style={{ animationDelay: '525ms' }}
        >
          <SectionLabel>Automation Studio</SectionLabel>
          <p className="text-xs text-charcoal/70 m-0 mb-3 relative z-10">
            Concept workflow view inspired by enterprise automation architecture.
          </p>

          <div className="workflow-track relative z-10 mb-3" aria-hidden="true">
            {workflowStages.map((stage, index) => (
              <div key={stage} className="workflow-segment">
                <span className="workflow-node">{stage}</span>
                {index < workflowStages.length - 1 && (
                  <span className="workflow-link">
                    <span className="workflow-packet" />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-divider/60 bg-charcoal/[0.03] p-3 relative z-10 overflow-hidden terminal-shell" aria-hidden="true">
            <div className="code-lines space-y-1.5">
              <p className="font-mono text-[11px] text-accent/90 m-0">$ automation run --template standard-intake</p>
              <p className="font-mono text-[11px] text-slate m-0">[stage] input validated, branching to queue</p>
              <p className="font-mono text-[11px] text-slate m-0">[stage] executor started with recovery profile</p>
              <p className="font-mono text-[11px] text-slate m-0 terminal-cursor">[flow] orchestration pipeline active</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 relative z-10">
            {workflowPrinciples.map((item) => (
              <span
                key={item}
                className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-divider text-slate"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="absolute top-2 right-3 flex items-center gap-1.5" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate">concept mode</span>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
            <div className="automation-grid-overlay h-full w-full" />
          </div>

          <div className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-wider text-slate/80" aria-hidden="true">
            workflow map
          </div>
        </div>
        {/* Contact Card */}
        <BentoCard to="/contact" delay={500} label="View contact details">
          <SectionLabel>Contact</SectionLabel>
          <p className="text-sm text-charcoal/70 m-0 mb-2">{contact.email}</p>
          <p className="text-xs text-slate m-0">{contact.location}</p>
          <div className="flex gap-3 mt-3">
            {contactLinks.map(({ label }) => (
              <span
                key={label}
                className="text-xs text-accent"
              >
                {label}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* Marquee Strip — spans full width */}
        <div className="md:col-span-2 lg:col-span-4 bento-card-entrance" style={{ animationDelay: '600ms' }}>
          <MarqueeStrip />
        </div>
      </div>
    </div>
  )
}

