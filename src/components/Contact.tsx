import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { contact, site } from '../data/site'
import { EASE_OUT } from '../lib/motion'
import { MagneticButton } from './MagneticButton'
import { MaskedLine, Reveal, Rule } from './Reveal'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.05])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden pt-[var(--section-y)]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[35vmax] left-1/2 h-[70vmax] w-[100vmax] -translate-x-1/2 rounded-[50%]"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
          background:
            'radial-gradient(circle at 50% 50%, rgb(255 169 255 / 0.16) 0%, rgb(255 169 255 / 0.05) 40%, transparent 70%)',
        }}
      />

      <div className="shell relative">
        <Rule />
        <div className="flex items-baseline justify-between gap-6 pt-4">
          <div className="flex items-baseline gap-4 sm:gap-8">
            <Reveal>
              <span className="label label--accent">05</span>
            </Reveal>
            <Reveal order={1}>
              <span className="label">{contact.sectionLabel}</span>
            </Reveal>
          </div>
          <Reveal order={2}>
            <span className="label text-[var(--faint)]">
              {site.availability} · {site.year}
            </span>
          </Reveal>
        </div>

        <h2 className="display display--md pt-[clamp(2.5rem,7vw,5.5rem)]">
          {contact.lines.map((line, index) =>
            index === contact.accentLineIndex ? (
              <MaskedLine key={line} order={index}>
                <span className="serif text-[var(--accent)]" style={{ fontSize: '1.05em', textTransform: 'lowercase' }}>
                  {line}
                </span>
              </MaskedLine>
            ) : (
              <MaskedLine key={line} order={index}>
                {line}
              </MaskedLine>
            ),
          )}
        </h2>

        <div className="flex flex-col items-start gap-10 pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(3rem,7vw,5rem)] md:flex-row md:items-end md:justify-between">
          <Reveal>
            <MagneticButton href={`mailto:${site.email}`}>{contact.cta}</MagneticButton>
          </Reveal>

          <div className="flex flex-col gap-3">
            <Reveal order={1}>
              <a
                href={`mailto:${site.email}`}
                className="link text-[clamp(1.05rem,2.2vw,1.6rem)] tracking-[-0.02em]"
              >
                {site.email}
              </a>
            </Reveal>
            {contact.emailNote ? (
              <Reveal order={2}>
                <p className="label text-[var(--faint)]">{contact.emailNote}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}

function Marquee() {
  const phrase = `${site.availability} — ${site.location.city} & ${contact.marqueeRemote} — ${site.year}`
  const items = Array.from({ length: 4 }, () => `${phrase} — `).join('')

  return (
    <div className="relative border-y border-[var(--line)] py-4">
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <motion.div
          className="flex shrink-0 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          <span className="label !tracking-[0.2em] text-[var(--faint)]">{items}</span>
          <span className="label !tracking-[0.2em] text-[var(--faint)]" aria-hidden="true">
            {items}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
