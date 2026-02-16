import { useState } from 'react'
import { Link } from 'react-router-dom'
import TypeWriter from '../components/TypeWriter'
import ParticleGrid from '../components/ParticleGrid'
import { experience, education, skills, contact, playbooks } from '../data/resume'

const current = experience[0] ?? null
const topSkills = (skills ?? []).flatMap((group) => group.items ?? []).slice(0, 8)
const educationItems = education ?? []
const contactLinks = contact?.links ?? []
const featuredPlaybook = playbooks[0] ?? null
const flowStages = ['Intake', 'Validation', 'Routing', 'Execution', 'Recovery']

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
    <div className="home-fluid-shell relative max-w-[98rem] mx-auto px-4 md:px-8 xl:px-10 pt-10 pb-28">
      <div className="home-side-glow home-side-glow-left" aria-hidden="true" />
      <div className="home-side-glow home-side-glow-right" aria-hidden="true" />

      <section className="home-hero-grid mb-6">
        <article className="lux-panel lux-hero relative overflow-hidden">
          <ParticleGrid />
          <div className="relative z-10">
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.98] m-0">
              Clay
              <br />
              <span className="text-accent">Titzer</span>
            </h1>
            {current && (
              <p className="text-xl text-slate mt-3 mb-0">
                {current.title}
              </p>
            )}
            <p className="text-sm text-charcoal/70 mt-6 mb-0 max-w-2xl leading-relaxed">
              <TypeWriter
                text="Building enterprise automation systems from design to deployment. Turning manual processes into reliable, scalable workflows."
                delay={360}
              />
            </p>
          </div>
          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            <Link
              to="/career"
              aria-label="View career details"
              className="lux-link-primary no-underline"
            >
              View Career Details
            </Link>
            <Link
              to="/about"
              aria-label="View about details"
              className="lux-link-secondary no-underline"
            >
              View About Details
            </Link>
          </div>
        </article>

        <article className="lux-panel lux-command">
          <SectionLabel>Automation Studio</SectionLabel>
          <p className="text-sm text-charcoal/70 m-0 mb-4">
            Interaction-first workflow surface with stage-aware motion and systems framing.
          </p>

          <div className="automation-ring-shell mb-4" aria-hidden="true">
            <div className="automation-ring automation-ring-outer" />
            <div className="automation-ring automation-ring-inner" />
            <div className="automation-core">RPA</div>
          </div>

          <div className="flow-rail mb-4" aria-hidden="true">
            {flowStages.map((stage, index) => (
              <div key={stage} className="flow-stage">
                <span>{stage}</span>
                {index < flowStages.length - 1 && (
                  <div className="flow-connector">
                    <span className="flow-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {current && (
            <div className="lux-inline-card">
              <p className="font-mono text-[10px] tracking-widest uppercase text-accent m-0 mb-1">Current Role</p>
              <p className="text-sm font-semibold m-0">{current.title}</p>
              <p className="text-xs text-slate m-0">{current.subtitle}</p>
            </div>
          )}
        </article>
      </section>

      <section className="home-fluid-grid">
        <article className="lux-panel panel-education">
          <SectionLabel>Education</SectionLabel>
          <div className="space-y-3 mb-4">
            {educationItems.map((ed) => (
              <div key={ed.shortTitle} className="lux-inline-card">
                <p className="text-sm font-semibold m-0">{ed.shortTitle}</p>
                <p className="text-xs text-slate m-0">{ed.institution}</p>
              </div>
            ))}
          </div>
          <Link to="/education" aria-label="View education details" className="lux-inline-link no-underline">
            View Education Details
          </Link>
        </article>

        <article className="lux-panel panel-skills">
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {topSkills.map(({ name }) => (
              <span key={name} className="lux-chip">{name}</span>
            ))}
          </div>
        </article>

        <article className="lux-panel panel-playbooks">
          <SectionLabel>Playbooks</SectionLabel>
          {featuredPlaybook ? (
            <>
              <p className="text-base font-semibold m-0">{featuredPlaybook.name}</p>
              <p className="text-xs text-slate mt-1 mb-3">{featuredPlaybook.summary}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {featuredPlaybook.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="lux-chip-subtle">{tool}</span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate m-0 mb-3">Playbooks coming soon.</p>
          )}
          <Link to="/playbooks" aria-label="View playbooks details" className="lux-inline-link no-underline">
            View Playbooks Details
          </Link>
        </article>

        <article className="lux-panel panel-actions">
          <SectionLabel>Quick Actions</SectionLabel>
          <div className="flex flex-col gap-2">
            <button
              onClick={copyEmail}
              className="lux-action-btn cursor-pointer"
            >
              {copied ? 'Email copied to clipboard' : 'Copy email'}
            </button>
            {contactLinks[0]?.url && (
              <a
                href={contactLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-action-link no-underline"
              >
                Open LinkedIn
              </a>
            )}
            <Link to="/playbooks" className="lux-action-link no-underline">
              Explore playbooks
            </Link>
          </div>
        </article>

        <article className="lux-panel panel-contact">
          <SectionLabel>Contact</SectionLabel>
          <p className="text-sm text-charcoal/75 m-0 mb-2">{contact.email}</p>
          <p className="text-xs text-slate m-0">{contact.location}</p>
          <div className="flex gap-3 mt-3">
            {contactLinks.map(({ label }) => (
              <span key={label} className="text-xs text-accent">{label}</span>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
