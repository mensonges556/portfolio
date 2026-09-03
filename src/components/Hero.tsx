import { motion, useTransform, type MotionValue } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { hero, site, ui } from '../data/site'
import { usePointerParallax } from '../hooks/usePointerParallax'

const LETTERS = site.name.toUpperCase().split('')
/** Depth factor per letter — the wordmark reads as four separate planes. */
const DEPTH = [1, 0.45, -0.45, -1]

export function Hero({ ready }: { ready: boolean }) {
  const { x, y } = usePointerParallax()

  const glowX = useTransform(x, [-0.5, 0.5], ['-18%', '18%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['-14%', '14%'])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-10 sm:pt-28 md:pb-12 lg:pb-24"
    >
      {/* Pointer-tracked accent halo — the only large use of the accent colour */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[85vmax] w-[85vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle at 50% 50%, rgb(255 169 255 / 0.13) 0%, rgb(255 169 255 / 0.04) 32%, transparent 62%)',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.2 }}
      />

      <GridLines ready={ready} />

      {/* ---- Eyebrow ------------------------------------------------ */}
      <div className="shell relative">
        <motion.div
          className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
        >
          <span className="label">
            {site.volume} <span className="text-[var(--faint)]">/ {site.year}</span>
          </span>
          <span className="label hidden text-[var(--faint)] lg:block">
            {site.location.coordinates}
          </span>
          <span className="label label--accent whitespace-nowrap">
            <span className="sm:hidden">{site.availabilityShort}</span>
            <span className="hidden sm:inline">{site.availability}</span>
          </span>
        </motion.div>
      </div>

      {/* ---- Wordmark ----------------------------------------------- */}
      <div className="shell relative flex flex-1 items-center py-10">
        {/* Real heading for assistive tech; the spread letters are decorative. */}
        <h1 className="sr-only">
          {site.name} — {site.role}. {site.discipline}
        </h1>

        <div aria-hidden="true" className="w-full">
          <div className="flex w-full justify-between">
            {LETTERS.map((letter, index) => (
              <Letter
                key={`${letter}-${index}`}
                letter={letter}
                depth={DEPTH[index % DEPTH.length]}
                index={index}
                ready={ready}
                pointerX={x}
                pointerY={y}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Foot of the scene -------------------------------------- */}
      <div className="shell relative">
        <motion.div
          className="h-px w-full origin-left bg-[var(--line)]"
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.75 }}
        />

        <div className="grid-12 pt-6 sm:pt-8">
          {/* Positioning statement */}
          <motion.p
            className="lead col-span-12 max-w-[38ch] text-pretty lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.95 }}
          >
            {hero.tagline}{' '}
            <span className="serif text-[var(--accent)]">{hero.taglineAccent}</span>.
          </motion.p>

          {/* Disciplines */}
          <motion.ul
            className="col-span-12 mt-10 flex flex-wrap gap-x-8 gap-y-2 lg:col-span-4 lg:col-start-7 lg:mt-0 lg:flex-col lg:gap-y-1.5"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.05 }}
          >
            {hero.disciplines.map((item, i) => (
              <li key={item} className="label flex items-baseline gap-3">
                <span className="text-[var(--faint)]">0{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          {/* Scroll indicator */}
          <motion.div
            className="col-span-12 mt-10 flex items-center gap-4 lg:col-span-2 lg:col-start-11 lg:mt-0 lg:justify-end"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.2 }}
          >
            <span className="label !text-[0.5625rem]">{ui.scrollHint}</span>
            <div className="relative h-10 w-px overflow-hidden bg-[var(--line)] lg:h-14">
              <motion.div
                className="absolute inset-x-0 h-1/2 bg-[var(--accent)]"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 2.2, ease: EASE_IN_OUT, repeat: Infinity, repeatDelay: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Letter({
  letter,
  depth,
  index,
  ready,
  pointerX,
  pointerY,
}: {
  letter: string
  depth: number
  index: number
  ready: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}) {
  const x = useTransform(pointerX, [-0.5, 0.5], [-16 * depth, 16 * depth])
  const y = useTransform(pointerY, [-0.5, 0.5], [-10 * depth, 10 * depth])

  return (
    // Parallax lives outside the mask so the drift never gets clipped.
    <motion.span className="block" style={{ x, y }}>
      <span className="block overflow-hidden pb-[0.06em]">
        <motion.span
          className="block font-semibold uppercase"
          style={{
            fontSize: 'clamp(4.5rem, 26vw, 21rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
          }}
          initial={{ y: '125%' }}
          animate={ready ? { y: '0%' } : { y: '125%' }}
          transition={{ duration: 1.15, ease: EASE_OUT, delay: 0.35 + index * 0.07 }}
        >
          {letter}
        </motion.span>
      </span>
    </motion.span>
  )
}

/** Four hairlines that draw down on load — the grid, made visible. */
function GridLines({ ready }: { ready: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={left}
          className="absolute top-0 h-full w-px origin-top bg-[var(--line)] opacity-60"
          style={{ left: `${left}%` }}
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.6, ease: EASE_IN_OUT, delay: 0.5 + i * 0.09 }}
        />
      ))}
    </div>
  )
}
