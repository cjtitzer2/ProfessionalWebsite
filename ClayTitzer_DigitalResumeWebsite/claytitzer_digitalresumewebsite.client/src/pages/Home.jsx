import { useEffect, useRef, useState } from 'react'
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
  const [sectionProgress, setSectionProgress] = useState({ role: 0, content: 0, philosophy: 0 })
  const roleRef = useRef(null)
  const contentRef = useRef(null)
  const philosophyRef = useRef(null)

  const getSectionProgress = (element) => {
    if (!element) return 0
    const rect = element.getBoundingClientRect()
    const viewportCenter = window.innerHeight * 0.5
    const sectionCenter = rect.top + rect.height * 0.5
    const distance = Math.abs(viewportCenter - sectionCenter)
    const maxDistance = Math.max(window.innerHeight * 0.8, 1)
    const value = 1 - distance / maxDistance
    return Math.max(0, Math.min(1, value))
  }

  useEffect(() => {
    const onScroll = () => {
      setScrollRatio(getScrollRatio())
      setSectionProgress({
        role: getSectionProgress(roleRef.current),
        content: getSectionProgress(contentRef.current),
        philosophy: getSectionProgress(philosophyRef.current),
      })
    }
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
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-semibold tracking-tight leading-[0.94] m-0 hero-title-emphasis">
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

      <section
        ref={roleRef}
        className="story-section role-stage"
        style={{ '--section-progress': `${sectionProgress.role}` }}
      >
        <div className="story-center">
          <SectionLabel>Current Role</SectionLabel>
          {current && (
            <>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight m-0 section-title-emphasis">{current.title}</h2>
              <p className="text-sm text-slate mt-1 mb-0">{current.subtitle}</p>
              <p className="font-mono text-[11px] text-accent/80 mt-2 mb-5 tracking-widest uppercase">{current.dates}</p>
              <div className="role-bullet-flow">
                {(current.bullets ?? []).slice(0, 3).map((item) => (
                  <p key={item} className="m-0 text-sm text-charcoal/78 leading-relaxed detail-text-emphasis">{item}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section
        ref={contentRef}
        className="story-section content-stage"
        style={{ '--section-progress': `${sectionProgress.content}` }}
      >
        <div className="story-center content-stage-grid">
          <Link
            to="/education"
            aria-label="View education details"
            className="stream-lane stream-link-lane stream-education no-underline"
          >
            <SectionLabel>Education</SectionLabel>
            <div className="space-y-3 mb-3">
              {educationItems.map((ed) => (
                <div key={ed.shortTitle} className="stream-entry">
                  <p className="text-sm font-semibold m-0">{ed.shortTitle}</p>
                  <p className="text-xs text-slate m-0">{ed.institution}</p>
                </div>
              ))}
            </div>
            <span className="lux-inline-link">
              View Education Details
            </span>
          </Link>

          <Link
            to="/skills"
            aria-label="View skills details"
            className="stream-lane stream-link-lane stream-skills no-underline"
          >
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {topSkills.map(({ name }) => (
                <span key={name} className="lux-chip">{name}</span>
              ))}
            </div>
          </Link>

          <Link
            to="/playbooks"
            aria-label="View playbooks details"
            className="stream-lane stream-link-lane stream-playbooks no-underline"
          >
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
            <span className="lux-inline-link">
              View Playbooks Details
            </span>
          </Link>

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

          <Link
            to="/contact"
            aria-label="View contact details"
            className="stream-lane stream-link-lane stream-contact no-underline"
          >
            <SectionLabel>Contact</SectionLabel>
            <div className="contact-fit-grid">
              <div>
                <p className="text-sm text-charcoal/75 m-0 mb-2">{contact.email}</p>
                <p className="text-xs text-slate m-0">{contact.location}</p>
              </div>
              <div className="contact-fit-links">
                {contactLinks.map(({ label }) => (
                  <span key={label} className="text-xs text-accent">{label}</span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section
        ref={philosophyRef}
        className="story-section philosophy-stage"
        style={{ '--section-progress': `${sectionProgress.philosophy}` }}
      >
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
