import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { site } from '../data/site'

const COUNT_MS = 1000

type Props = {
  /** Fires the moment the curtain starts lifting, so the hero can begin. */
  onReveal: () => void
  /** Fires once the loader is fully off-screen and can unmount. */
  onDone: () => void
}

/**
 * Short opening sequence: identity + 00→100 counter, then the curtain lifts.
 * Total time is capped around 1.3s so it never feels like a gate.
 */
export function PageLoader({ onReveal, onDone }: Props) {
  const reduced = useReducedMotion()
  // With reduced motion the sequence is skipped entirely: full count, no wipe.
  const [count, setCount] = useState(() => (reduced ? 100 : 0))
  const [leaving, setLeaving] = useState(() => Boolean(reduced))
  const revealed = useRef(false)

  useEffect(() => {
    if (reduced) {
      onReveal()
      const t = window.setTimeout(onDone, 260)
      return () => window.clearTimeout(t)
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS)
      // Ease-out so the number decelerates into 100 instead of stopping dead.
      const eased = 1 - Math.pow(1 - t, 2.2)
      setCount(Math.round(eased * 100))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else if (!revealed.current) {
        revealed.current = true
        setLeaving(true)
        onReveal()
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, onReveal, onDone])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-between bg-[var(--background)] px-[var(--gutter)] py-[var(--gutter)]"
      style={{ zIndex: 'var(--z-loader)' }}
      initial={{ y: 0 }}
      animate={leaving && !reduced ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1, ease: EASE_IN_OUT, delay: 0.12 }}
      onAnimationComplete={() => {
        if (leaving) onDone()
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-start justify-between"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
      >
        <span className="label">{site.volume}</span>
        <span className="label">
          © {site.year}
        </span>
      </motion.div>

      <motion.div
        className="flex items-end justify-between gap-6"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -12 : 0 }}
        transition={{ duration: 0.36, ease: EASE_OUT }}
      >
        <div className="overflow-hidden">
          <motion.h2
            className="h1"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            {site.name}
          </motion.h2>
        </div>

        <div className="numeral shrink-0 text-right text-[clamp(2rem,6vw,5rem)] leading-none tracking-tight">
          <span style={{ color: count >= 100 ? 'var(--accent)' : 'inherit' }}>
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </motion.div>

      {/* Progress hairline */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-[var(--line)]">
        <div
          className="h-full origin-left bg-[var(--accent)]"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </motion.div>
  )
}
