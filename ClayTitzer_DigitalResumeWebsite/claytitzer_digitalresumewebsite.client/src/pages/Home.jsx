import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import ScrollSpy from '../components/ScrollSpy'
import { experience, education } from '../data/resume'

const current = experience[0] ?? null
const sections = ['Intro', ...(current ? ['Role'] : []), 'Education']

export default function Home() {
  return (
    <>
      <ScrollSpy sections={sections} />
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="min-h-[85vh] flex flex-col justify-center pt-20">
          <ScrollReveal>
            <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
              Automation | Orchestration | Integration
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold text-charcoal leading-tight tracking-tight m-0">
              Clay <span className="text-accent">Titzer</span>
            </h1>
          </ScrollReveal>

          {current && (
            <ScrollReveal delay={200}>
              <p className="text-xl text-slate mt-3 mb-0 font-light">
                {current.title}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal delay={300}>
            <p className="text-base text-charcoal/70 mt-6 mb-0 max-w-lg leading-relaxed">
              Building enterprise automation systems from design to deployment.
              Turning manual processes into reliable, scalable workflows.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex gap-6 mt-10">
              <Link to="/career" className="text-sm font-medium px-5 py-2.5 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-200 no-underline">
                View Career
              </Link>
              <Link to="/about" className="text-sm font-medium px-5 py-2.5 border border-charcoal/20 text-charcoal rounded-sm hover:border-accent hover:text-accent transition-colors duration-200 no-underline">
                About
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 justify-center my-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Current Role */}
        {current && (
          <>
            <section className="py-16">
              <ScrollReveal>
                <p className="font-mono text-xs text-gold tracking-widest uppercase mb-6">Current Role</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="border-l-2 border-accent pl-6 bg-accent-light/30 py-5 pr-5 rounded-r-sm">
                  <h2 className="text-2xl font-semibold text-charcoal m-0">{current.title}</h2>
                  <p className="text-slate mt-1 mb-0">{current.subtitle}</p>
                  <p className="font-mono text-xs text-gold mt-1 mb-0 tracking-wide">{current.dates}</p>
                  <ul className="mt-4 space-y-2 list-none p-0">
                    {current.bullets.slice(0, 3).map((item, i) => (
                      <li key={i} className="bullet">{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </section>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 justify-center my-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </>
        )}

        {/* Education Preview */}
        <section className="py-16 pb-24">
          <ScrollReveal>
            <p className="font-mono text-xs text-gold tracking-widest uppercase mb-6">Education</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((ed, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 100}>
                <div className="p-5 border border-divider/60 rounded-sm hover:border-accent/30 hover:shadow-sm transition-all duration-200">
                  <h3 className="text-lg font-semibold text-charcoal m-0">{ed.shortTitle}</h3>
                  <p className="text-slate text-sm mt-1 mb-0">{ed.institution}</p>
                  <p className="font-mono text-xs text-gold mt-2 tracking-wide">{ed.year}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <div className="mt-8">
              <Link to="/education" className="text-sm text-accent hover:text-accent-hover transition-colors duration-200 no-underline border-b border-accent/30 hover:border-accent pb-0.5">
                Full Education Details
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  )
}
