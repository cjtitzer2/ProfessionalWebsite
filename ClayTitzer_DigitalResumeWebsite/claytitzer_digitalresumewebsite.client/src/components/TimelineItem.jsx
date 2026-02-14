import ScrollReveal from './ScrollReveal'

export default function TimelineItem({ title, subtitle, dates, bullets = [], isCurrent = false, delay = 0 }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="relative pl-8 pb-10 group">
        {/* Connector line */}
        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-divider group-last:hidden" />

        {/* Node dot */}
        <div
          className={`absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 transition-all duration-200 ${
            isCurrent
              ? 'bg-accent border-accent'
              : 'bg-offwhite border-slate group-hover:border-accent'
          }`}
        />

        <div>
          <h3 className="text-lg font-semibold text-charcoal m-0 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-slate text-sm mt-0.5 mb-0">{subtitle}</p>
          )}
          <p className="font-mono text-xs text-gold mt-1 mb-0 tracking-wide">
            {dates}
          </p>

          {bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5 list-none p-0">
              {bullets.map((bullet, i) => (
                <li key={i} className="bullet">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ScrollReveal>
  )
}
