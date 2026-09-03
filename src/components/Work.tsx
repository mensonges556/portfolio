import { Archive } from './Archive'
import { FeaturedProject } from './FeaturedProject'
import { ProjectIndex } from './ProjectIndex'
import { SectionHeader } from './Reveal'
import { work } from '../data/site'

export function Work() {
  return (
    <section id="work" className="section shell">
      <SectionHeader
        index="02"
        title={work.sectionTitle}
        aside={
          <span className="label text-[var(--faint)]">{work.sectionAside}</span>
        }
      />

      <FeaturedProject />
      <ProjectIndex />
      <Archive />
    </section>
  )
}
