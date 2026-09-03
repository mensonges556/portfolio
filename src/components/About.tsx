import { about } from '../data/site'
import { MaskedLine, Reveal, SectionHeader } from './Reveal'
import { ProjectVisual } from './ProjectVisual'

export function About() {
  return (
    <section id="about" className="section shell">
      <SectionHeader index="03" title={about.sectionTitle} />

      <div className="grid-12 gap-y-12 pt-[clamp(3rem,7vw,6rem)]">
        <div className="order-1 col-span-12 lg:col-span-7 lg:col-start-6">
          <h3
            className="font-medium uppercase"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 0.98,
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            <MaskedLine>{about.headline[0]}</MaskedLine>
            <MaskedLine order={1}>
              {about.headline[1]}{' '}
              <span className="serif text-[var(--accent)]">{about.headlineAccent}</span>
              {about.headlineEnd}
            </MaskedLine>
          </h3>

          <Reveal className="mt-10 max-w-[36ch]">
            <p className="text-[1.0625rem] text-pretty leading-relaxed text-[var(--muted)]">
              {about.bio}
            </p>
          </Reveal>
        </div>

        <div className="order-2 col-span-12 lg:order-none lg:col-span-4 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4 / 5' }}
              >
                <ProjectVisual variant="monogram" caption={about.portraitCaption} />
              </div>
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-1 lg:gap-y-7">
              {about.meta.map((block, index) => (
                <Reveal key={block.label} order={index} className="border-t border-[var(--line)] pt-3">
                  <dt className="label !text-[0.5625rem] text-[var(--faint)]">{block.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.45]">
                    {block.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
