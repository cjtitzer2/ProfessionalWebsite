import PageHeader from '../components/PageHeader'
import TimelineItem from '../components/TimelineItem'
import ScrollSpy from '../components/ScrollSpy'
import { education } from '../data/resume'

export default function Education() {
  return (
    <>
      <ScrollSpy sections={education.map(e => e.shortTitle)} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <PageHeader label="Output" title="Education" />
        <div className="max-w-3xl">
          {education.map((item, i) => (
            <TimelineItem key={item.title} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </>
  )
}
