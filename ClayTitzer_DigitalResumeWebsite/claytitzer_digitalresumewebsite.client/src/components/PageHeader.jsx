import ScrollReveal from './ScrollReveal'

export default function PageHeader({ label, title }) {
  return (
    <ScrollReveal>
      <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
        {label}
      </p>
      <h1 className="text-4xl font-bold text-charcoal tracking-tight m-0 mb-12">
        {title}
      </h1>
    </ScrollReveal>
  )
}
