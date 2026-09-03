import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { EASE_OUT } from '../lib/motion'
import { hudNotes, sectionIndex, site, ui } from '../data/site'
import { scrollToId } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = sectionIndex.map((s) => s.id)

/**
 * Fixed instrumentation around the page: scroll readout, local clock,
 * availability status and a section index. Small, quiet, and the main
 * reason the site feels custom-built rather than assembled.
 */
export function Hud({ ready }: { ready: boolean }) {
  const { scrollY, scrollYProgress } = useScroll()
  const [percent, setPercent] = useState(0)
  const [pastHero, setPastHero] = useState(false)
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const barScale = useTransform(progress, [0, 1], [0.02, 1])
  const active = useActiveSection(SECTION_IDS)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setPercent(Math.round(value * 100))
  })

  // The index would sit on top of the hero wordmark, so it waits its turn.
  useMotionValueEvent(scrollY, 'change', (value) => {
    setPastHero(value > window.innerHeight * 0.55)
  })

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 hidden lg:block"
      style={{ zIndex: 'calc(var(--z-nav) - 2)' }}
      initial={{ opacity: 0 }}
      // The instruments retreat once the footer arrives, leaving it clean.
      animate={{ opacity: ready ? (percent >= 98 ? 0 : 1) : 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: ready && percent < 98 ? 0.5 : 0 }}
      aria-hidden="true"
    >
      {/* Scrim so page content passing beneath the HUD stays legible */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            'linear-gradient(to top, var(--background) 0%, rgb(8 8 10 / 0.82) 45%, transparent 100%)',
        }}
      />

      {/* Scroll readout */}
      <div className="absolute bottom-6 left-[var(--gutter)] flex items-center gap-3">
        <span className="numeral text-[0.625rem] tracking-[0.14em] text-[var(--muted)]">
          {String(percent).padStart(3, '0')}
        </span>
        <div className="h-px w-16 bg-[var(--line)]">
          <motion.div
            className="h-full origin-left bg-[var(--accent)]"
            style={{ scaleX: barScale }}
          />
        </div>
        <span className="label !text-[0.5625rem] text-[var(--faint)]">{ui.scrolled}</span>
      </div>

      {/* Local time + availability */}
      <div className="absolute right-[var(--gutter)] bottom-6 flex items-center gap-6">
        <RotatingNote />
        <span className="label !text-[0.5625rem] text-[var(--faint)]">
          {site.location.city} · <Clock />
        </span>
        <span className="label flex items-center gap-2 !text-[0.5625rem]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
          </span>
          {site.availabilityShort}
        </span>
      </div>

      {/* Section index */}
      <motion.ul
        // Sits in the outer margin, clear of the content column.
        className="pointer-events-auto absolute top-1/2 flex -translate-y-1/2 flex-col items-end gap-3"
        animate={{ opacity: pastHero ? 1 : 0, x: pastHero ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        style={{
          right: 'clamp(0.75rem, 1.4vw, 1.5rem)',
          pointerEvents: pastHero ? 'auto' : 'none',
        }}
      >
        {sectionIndex.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToId(section.id)}
                data-cursor="hover"
                // The HUD is aria-hidden (it duplicates the nav), so these
                // must stay out of the tab order rather than being
                // focusable-but-hidden.
                tabIndex={-1}
                className="group flex items-center gap-3"
                aria-label={ui.goToSection(section.label)}
              >
                <span
                  className="label !text-[0.5625rem] opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
                >
                  {section.label}
                </span>
                <span
                  className="h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: isActive ? 22 : 10,
                    background: isActive ? 'var(--accent)' : 'var(--line-strong)',
                  }}
                />
              </button>
            </li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}

function Clock() {
  const [time, setTime] = useState(() => formatTime())

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return <span className="numeral">{time}</span>
}

function formatTime() {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      timeZone: site.location.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return new Date().toLocaleTimeString('fr-FR', { hour12: false })
  }
}

/** Cycles a short line of copy — a deliberate flicker of personality. */
function RotatingNote() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % hudNotes.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="label hidden !text-[0.5625rem] text-[var(--faint)] xl:inline">
      <motion.span
        key={index}
        className="inline-block"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        {hudNotes[index]}
      </motion.span>
    </span>
  )
}
