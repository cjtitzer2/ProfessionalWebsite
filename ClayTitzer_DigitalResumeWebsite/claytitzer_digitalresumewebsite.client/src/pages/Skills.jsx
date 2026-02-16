import ScrollReveal from '../components/ScrollReveal'
import PageHeader from '../components/PageHeader'
import ScrollSpy from '../components/ScrollSpy'
import { skills } from '../data/resume'

const levelWidth = { Expert: 'w-full', Advanced: 'w-2/3', Intermediate: 'w-1/3', Foundational: 'w-1/6' }
const levelOrder = { Expert: 0, Advanced: 1, Intermediate: 2, Foundational: 3 }
const getBarWidth = (level) => levelWidth[level] || 'w-1/3'

const sortedSkills = skills.map((group) => ({
  ...group,
  items: [...group.items].sort((a, b) => (levelOrder[a.level] ?? 4) - (levelOrder[b.level] ?? 4)),
}))

export default function Skills() {
  return (
    <>
      <ScrollSpy sections={sortedSkills.map((s) => s.category)} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <PageHeader label="Capabilities" title="Technical Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {sortedSkills.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 100}>
              <div className="border border-divider/60 rounded-sm p-6 hover:border-accent/30 transition-all duration-200">
                <h2 className="text-sm font-mono text-gold tracking-widest uppercase m-0 mb-5">
                  {group.category}
                </h2>
                <ul className="list-none m-0 p-0 space-y-4">
                  {group.items.map(({ name, level }) => (
                    <li key={name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-charcoal/90">{name}</span>
                        <span className="text-xs font-mono text-slate">{level}</span>
                      </div>
                      <div className="h-1 bg-divider/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-accent to-gold rounded-full ${getBarWidth(level)}`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  )
}
