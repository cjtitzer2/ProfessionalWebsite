const keywords = [
  'UiPath', 'C#', 'SQL', 'Azure DevOps', 'React', 'Automation',
  'Orchestration', 'API Integration', 'VB.NET', 'Solution Architecture',
  'Databricks', 'Git', 'Process Design', 'Enterprise Workflows',
]

export default function MarqueeStrip() {
  const items = [...keywords, ...keywords]
  const reverseItems = [...keywords].reverse()
  const reverseLoop = [...reverseItems, ...reverseItems]

  return (
    <div className="overflow-hidden py-4 border-y border-divider/40 space-y-2" aria-hidden="true">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: 'marquee 25s linear infinite' }}
      >
        {items.map((word, i) => (
          <span key={i} className="font-mono text-xs text-slate/60 tracking-widest uppercase flex items-center gap-8">
            {word}
            <span aria-hidden="true">&middot;</span>
          </span>
        ))}
      </div>
      <div
        className="flex gap-8 whitespace-nowrap opacity-60"
        style={{ animation: 'marquee-reverse 20s linear infinite' }}
      >
        {reverseLoop.map((word, i) => (
          <span key={`r-${i}`} className="font-mono text-[10px] text-slate/70 tracking-widest uppercase flex items-center gap-8">
            {word}
            <span aria-hidden="true">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
