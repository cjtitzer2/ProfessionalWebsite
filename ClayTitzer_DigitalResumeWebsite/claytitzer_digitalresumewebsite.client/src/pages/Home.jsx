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
  const [heroGridFade, setHeroGridFade] = useState(1)
  const [sectionProgress, setSectionProgress] = useState({ hero: 0, role: 0, content: 0, philosophy: 0 })
  const [activeSection, setActiveSection] = useState('hero')
  const cursorGlowRef = useRef(null)
  const pointerTargetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const heroRef = useRef(null)
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
      const hero = getSectionProgress(heroRef.current)
      const role = getSectionProgress(roleRef.current)
      const content = getSectionProgress(contentRef.current)
      const philosophy = getSectionProgress(philosophyRef.current)
      const heroRect = heroRef.current?.getBoundingClientRect()
      const heroFade = heroRect
        ? Math.max(0, Math.min(1, heroRect.bottom / Math.max(window.innerHeight, 1)))
        : 1
      const sectionMap = { hero, role, content, philosophy }
      const nextActive = Object.entries(sectionMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'hero'
      setScrollRatio(getScrollRatio())
      setHeroGridFade(heroFade)
      setSectionProgress(sectionMap)
      setActiveSection(nextActive)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const onMouseMove = (event) => {
      pointerTargetRef.current = { x: event.clientX, y: event.clientY }
    }

    const animateGlow = () => {
      const glow = cursorGlowRef.current
      if (glow) {
        const { x, y } = pointerTargetRef.current
        glow.style.transform = `translate3d(${x - 132}px, ${y - 132}px, 0)`
      }
      rafRef.current = window.requestAnimationFrame(animateGlow)
    }

    rafRef.current = window.requestAnimationFrame(animateGlow)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
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

  const navSections = [
    { id: 'hero', label: 'Hero', ref: heroRef },
    { id: 'role', label: 'Current Role', ref: roleRef },
    { id: 'content', label: 'Details', ref: contentRef },
    { id: 'philosophy', label: 'Philosophy', ref: philosophyRef },
  ]

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="home-scroll-story" style={{ '--grid-fade': `${heroGridFade}` }}>
      <span
        ref={cursorGlowRef}
        className="cursor-glow"
        aria-hidden="true"
      />
      <aside className="section-progress-nav" aria-label="Page section progress">
        <div className="section-progress-track" aria-hidden="true">
          <span
            className="section-progress-fill"
            style={{ transform: `scaleY(${Math.max(scrollRatio, 0.03)})` }}
          />
        </div>
        <div className="section-progress-links">
          {navSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.ref)}
              className={`section-progress-link ${activeSection === section.id ? 'is-active' : ''}`}
              aria-current={activeSection === section.id ? 'location' : undefined}
            >
              {section.label}
            </button>
          ))}
        </div>
      </aside>

      <section ref={heroRef} className="story-section hero-stage">
        <div className="hero-scroll-bg" aria-hidden="true">
          <div
            className="hero-workflow"
            style={{ transform: `translateY(${scrollRatio * 44}px) scale(${1 + scrollRatio * 0.05})` }}
          >
            <svg className="hero-workflow-svg" viewBox="0 0 780 430" preserveAspectRatio="xMidYMid meet">
              <line className="hero-workflow-link-base" x1="90" y1="90" x2="240" y2="90" />
              <line className="hero-workflow-link-base" x1="240" y1="90" x2="400" y2="90" />
              <line className="hero-workflow-link-base" x1="400" y1="90" x2="560" y2="50" />
              <line className="hero-workflow-link-base" x1="400" y1="90" x2="560" y2="190" />
              <line className="hero-workflow-link-base" x1="560" y1="50" x2="710" y2="120" />
              <line className="hero-workflow-link-base" x1="560" y1="190" x2="710" y2="120" />
              <line className="hero-workflow-link-base" x1="710" y1="120" x2="710" y2="250" />

              <line className="hero-workflow-link-signal" x1="90" y1="90" x2="240" y2="90" style={{ animationDelay: '0s' }} />
              <line className="hero-workflow-link-signal" x1="240" y1="90" x2="400" y2="90" style={{ animationDelay: '0.28s' }} />
              <line className="hero-workflow-link-signal" x1="400" y1="90" x2="560" y2="50" style={{ animationDelay: '0.55s' }} />
              <line className="hero-workflow-link-signal" x1="400" y1="90" x2="560" y2="190" style={{ animationDelay: '0.85s' }} />
              <line className="hero-workflow-link-signal" x1="560" y1="50" x2="710" y2="120" style={{ animationDelay: '1.1s' }} />
              <line className="hero-workflow-link-signal" x1="560" y1="190" x2="710" y2="120" style={{ animationDelay: '1.35s' }} />
              <line className="hero-workflow-link-signal" x1="710" y1="120" x2="710" y2="250" style={{ animationDelay: '1.62s' }} />

              <rect className="hero-workflow-node" x="72" y="72" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node" x="222" y="72" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node hero-workflow-node-decision" x="382" y="72" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node" x="542" y="32" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node" x="542" y="172" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node" x="692" y="102" width="36" height="36" rx="10" />
              <rect className="hero-workflow-node" x="692" y="232" width="36" height="36" rx="10" />

              <rect className="hero-workflow-node-core" x="84" y="84" width="12" height="12" rx="4" />
              <rect className="hero-workflow-node-core" x="234" y="84" width="12" height="12" rx="4" />
              <rect className="hero-workflow-node-core" x="394" y="84" width="12" height="12" rx="4" transform="rotate(45 400 90)" />
              <rect className="hero-workflow-node-core" x="554" y="44" width="12" height="12" rx="4" />
              <rect className="hero-workflow-node-core" x="554" y="184" width="12" height="12" rx="4" />
              <rect className="hero-workflow-node-core" x="704" y="114" width="12" height="12" rx="4" />
              <rect className="hero-workflow-node-core" x="704" y="244" width="12" height="12" rx="4" />
            </svg>
          </div>
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
            <div className="flex flex-col gap-2 quick-actions-stack">
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
