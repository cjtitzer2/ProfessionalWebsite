import PageHeader from '../components/PageHeader'
import TimelineItem from '../components/TimelineItem'
import ScrollSpy from '../components/ScrollSpy'
import { experience } from '../data/resume'

export default function Career() {
  return (
    <>
      <ScrollSpy sections={experience.map(e => e.title)} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <PageHeader label="Process" title="Career" />
        <div className="max-w-3xl">
          {experience.map((item, i) => (
            <TimelineItem key={item.title} {...item} delay={i * 80} />
          ))}
        </div>
      </div>
    </>
  )
}
