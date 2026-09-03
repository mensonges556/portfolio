import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { manifesto, type ManifestoWord } from '../data/site'
import { Reveal, Rule, SectionHeader } from './Reveal'

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  const total = manifesto.lines.flat().length
  let cursor = 0

  return (
    <section id="manifesto" className="section shell">
      <SectionHeader index="01" title={manifesto.sectionTitle} />

      <div ref={ref} className="pt-[clamp(3rem,9vw,7rem)] pb-[clamp(3rem,8vw,6rem)]">
        {manifesto.lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="h1 flex flex-wrap items-baseline gap-x-[0.26em]"
            style={{ paddingLeft: lineIndex === 1 ? 'clamp(0rem, 8vw, 10rem)' : undefined }}
          >
            {line.map((word) => {
              const index = cursor++
              return (
                <StatementWord
                  key={`${lineIndex}-${word.text}`}
                  word={word}
                  progress={scrollYProgress}
                  start={index / total}
                  end={(index + 1) / total}
                  disabled={Boolean(reduced)}
                />
              )
            })}
          </div>
        ))}
      </div>

      <Rule />

      <div className="grid-12 gap-y-10 pt-10">
        <Reveal className="col-span-12 lg:col-span-3">
          <span className="label">{manifesto.approachLabel}</span>
        </Reveal>

        <div className="col-span-12 grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-9">
          {manifesto.principles.map((principle, i) => (
            <Reveal key={principle.number} order={i} className="flex flex-col gap-3">
              <span className="label label--accent">{principle.number}</span>
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em]">
                {principle.title}
              </h3>
              <p className="max-w-[32ch] text-[0.9375rem] text-pretty text-[var(--muted)]">
                {principle.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatementWord({
  word,
  progress,
  start,
  end,
  disabled,
}: {
  word: ManifestoWord
  progress: MotionValue<number>
  start: number
  end: number
  disabled: boolean
}) {
  const opacity = useTransform(progress, [start, end], [0.13, 1])

  return (
    <motion.span
      className={word.accent ? 'serif text-[var(--accent)]' : undefined}
      style={{
        opacity: disabled ? 1 : opacity,
        fontSize: word.accent ? '1.12em' : undefined,
      }}
    >
      {word.accent ? word.text : word.text.toUpperCase()}
    </motion.span>
  )
}
