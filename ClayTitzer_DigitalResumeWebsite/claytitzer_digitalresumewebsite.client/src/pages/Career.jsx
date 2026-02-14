import PageHeader from '../components/PageHeader'
import TimelineItem from '../components/TimelineItem'
import ScrollSpy from '../components/ScrollSpy'
import { experience } from '../data/resume'

export default function Career() {
  return (
    <>
      <ScrollSpy sections={experience.map(e => e.title)} />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <PageHeader label="Process" title="Career" />
        <div className="max-w-2xl">
          {experience.map((item, i) => (
            <TimelineItem key={i} {...item} delay={i * 80} />
          ))}
        </div>
      </div>
    </>
  )
}
