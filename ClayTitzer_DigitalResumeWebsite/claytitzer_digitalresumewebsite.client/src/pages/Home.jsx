import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TypeWriter from '../components/TypeWriter'
import { experience, education, skills, contact, playbooks } from '../data/resume'

const current = experience[0] ?? null
const topSkills = (skills ?? []).flatMap((group) => group.items ?? []).slice(0, 10)
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

function getScrollRatio() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const ratio = window.scrollY / maxScroll
  return Math.max(0, Math.min(1, ratio))
}

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [scrollRatio, setScrollRatio] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollRatio(getScrollRatio())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

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
    <div className="home-scroll-story">
      <section className="story-section hero-stage">
        <div className="hero-scroll-bg" aria-hidden="true">
          <span
            className="hero-orb hero-orb-a"
            style={{ transform: `translateY(${scrollRatio * 80}px) scale(${1 + scrollRatio * 0.08})` }}
          />
          <span
            className="hero-orb hero-orb-b"
            style={{ transform: `translateY(${scrollRatio * -65}px) scale(${1 + scrollRatio * 0.06})` }}
          />
          <span
            className="hero-grid"
            style={{ transform: `translateY(${scrollRatio * 45}px)` }}
          />
        </div>

        <div className="story-center hero-content">
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-semibold tracking-tight leading-[0.94] m-0">
            Clay
            <br />
            <span className="text-accent">Titzer</span>
          </h1>
          {current && (
            <p className="text-xl text-slate mt-3 mb-0">
              {current.title}
            </p>
          )}
          <p className="text-sm text-charcoal/70 mt-6 mb-0 max-w-3xl leading-relaxed">
            <TypeWriter
              text="Building enterprise automation systems from design to deployment. Turning manual processes into reliable, scalable workflows."
              delay={300}
            />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/career" aria-label="View career details" className="lux-link-primary no-underline">
              View Career Details
            </Link>
            <Link to="/about" aria-label="View about details" className="lux-link-secondary no-underline">
              View About Details
            </Link>
          </div>
        </div>
      </section>

      <section className="story-section role-stage">
        <div className="story-center">
          <SectionLabel>Current Role</SectionLabel>
          {current && (
            <>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight m-0">{current.title}</h2>
              <p className="text-sm text-slate mt-1 mb-0">{current.subtitle}</p>
              <p className="font-mono text-[11px] text-accent/80 mt-2 mb-5 tracking-widest uppercase">{current.dates}</p>
              <div className="role-bullet-flow">
                {(current.bullets ?? []).slice(0, 3).map((item) => (
                  <p key={item} className="m-0 text-sm text-charcoal/78 leading-relaxed">{item}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="story-section content-stage">
        <div className="story-center content-stage-grid">
          <article className="stream-lane stream-education">
            <SectionLabel>Education</SectionLabel>
            <div className="space-y-3 mb-3">
              {educationItems.map((ed) => (
                <div key={ed.shortTitle} className="stream-entry">
                  <p className="text-sm font-semibold m-0">{ed.shortTitle}</p>
                  <p className="text-xs text-slate m-0">{ed.institution}</p>
                </div>
              ))}
            </div>
            <Link to="/education" aria-label="View education details" className="lux-inline-link no-underline">
              View Education Details
            </Link>
          </article>

          <article className="stream-lane stream-skills">
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {topSkills.map(({ name }) => (
                <span key={name} className="lux-chip">{name}</span>
              ))}
            </div>
          </article>

          <article className="stream-lane stream-playbooks">
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

          <article className="stream-lane stream-actions">
            <SectionLabel>Quick Actions</SectionLabel>
            <div className="flex flex-col gap-2">
              <button onClick={copyEmail} className="lux-action-btn cursor-pointer">
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

          <article className="stream-lane stream-contact">
            <SectionLabel>Contact</SectionLabel>
            <p className="text-sm text-charcoal/75 m-0 mb-2">{contact.email}</p>
            <p className="text-xs text-slate m-0">{contact.location}</p>
            <div className="flex gap-3 mt-3">
              {contactLinks.map(({ label }) => (
                <span key={label} className="text-xs text-accent">{label}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="story-section philosophy-stage">
        <div className="story-center">
          <SectionLabel>Automation Philosophy</SectionLabel>
          <p className="text-sm text-charcoal/72 m-0 mb-5 max-w-3xl">
            Reliable automation is built as an operating system: strict inputs, intentional routing, deterministic execution, and graceful recovery.
          </p>

          <div className="flow-rail mb-5" aria-hidden="true">
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

          <div className="philosophy-points">
            <p className="m-0">Validate early so failures are prevented before execution begins.</p>
            <p className="m-0">Route work predictably so ownership and priority stay clear.</p>
            <p className="m-0">Design for recovery so automation remains resilient in production.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
