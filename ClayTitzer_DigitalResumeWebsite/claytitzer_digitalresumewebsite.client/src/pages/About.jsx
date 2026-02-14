import ScrollReveal from '../components/ScrollReveal'
import PageHeader from '../components/PageHeader'
import ScrollSpy from '../components/ScrollSpy'
import { focusAreas } from '../data/resume'

const philosophy = [
  { title: 'Automation as leverage', body: 'The best automation removes friction silently. Build systems that multiply output without multiplying complexity.', accent: true },
  { title: 'Clean systems over complexity', body: 'Maintainable beats clever. Reusable frameworks and clear documentation outlast any one-off solution.', accent: false },
]

export default function About() {
  return (
    <>
      <ScrollSpy sections={['Bio', 'Philosophy', 'Technical']} />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <PageHeader label="Trigger" title="About" />

        <ScrollReveal delay={100}>
          <p className="text-base text-charcoal/80 leading-relaxed m-0 max-w-2xl mb-16">
            I&apos;m an RPA Developer at Old National Bank, where I lead the design,
            development, and deployment of enterprise automation solutions. My path
            into automation started through a LEAD development program within digital
            transformation — from there I moved into full-time RPA development and
            now serve as lead technical expert for the team.
          </p>
        </ScrollReveal>

        <div className="flex items-center gap-3 my-4 mb-12">
          <div className="w-8 h-px bg-gradient-to-r from-accent/40 to-gold/60" />
          <div className="w-1 h-1 rounded-full bg-gold" />
        </div>

        <ScrollReveal delay={200}>
          <h2 className="text-xl font-semibold text-charcoal m-0 mb-4">Philosophy</h2>
          <div className="space-y-4 mb-16">
            {philosophy.map(({ title, body, accent }) => (
              <div key={title} className={`border-l-2 pl-5 py-3 rounded-r-sm ${accent ? 'border-accent bg-accent-light/20' : 'border-gold/40 bg-gold-light'}`}>
                <p className="text-sm font-medium text-charcoal m-0">{title}</p>
                <p className="text-sm text-charcoal/70 mt-1 m-0 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="flex items-center gap-3 my-4 mb-12">
          <div className="w-8 h-px bg-gradient-to-r from-accent/40 to-gold/60" />
          <div className="w-1 h-1 rounded-full bg-gold" />
        </div>

        <ScrollReveal delay={300}>
          <h2 className="text-xl font-semibold text-charcoal m-0 mb-4">Technical Focus</h2>
          <div className="flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span key={area} className="font-mono text-xs text-charcoal/70 border border-accent/20 bg-accent-light/20 px-3 py-1.5 rounded-sm hover:border-accent/50 transition-colors duration-200">
                {area}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </>
  )
}
