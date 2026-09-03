import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type Props = {
  href: string
  children: ReactNode
  /** How far the button drifts toward the pointer, in px. */
  strength?: number
  className?: string
}

/**
 * Primary CTA. Three layered interactions, all cheap:
 * magnetic drift toward the pointer, an accent fill wiping up from the
 * bottom edge, and an arrow that hands off to a second arrow.
 */
export function MagneticButton({ href, children, strength = 14, className = '' }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.5 })

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    rawX.set(Math.max(-1, Math.min(1, dx)) * strength)
    rawY.set(Math.max(-1, Math.min(1, dy)) * strength * 0.6)
  }

  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      data-cursor="hover"
      className={`group relative inline-flex items-center overflow-hidden rounded-full border border-[var(--line-strong)] px-9 py-5 sm:px-14 sm:py-7 ${className}`}
    >
      {/* Accent wipe */}
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full bg-[var(--accent)] transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      />

      <span className="relative flex items-center gap-5 transition-colors duration-300 group-hover:text-[#08080A] group-focus-visible:text-[#08080A]">
        <span className="label !text-[0.8rem] !tracking-[0.14em] text-inherit">
          {children}
        </span>

        {/* Arrow hand-off: the first slides out, the second slides in. */}
        <span aria-hidden="true" className="relative h-3 w-6 overflow-hidden">
          <Arrow className="absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-focus-visible:translate-x-full" />
          <Arrow className="absolute inset-0 -translate-x-full transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" />
        </span>
      </span>
    </motion.a>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 12"
      fill="none"
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path d="M0 6h22" stroke="currentColor" strokeWidth="1.2" />
      <path d="M17 1.5 22 6l-5 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
