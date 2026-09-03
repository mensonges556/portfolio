import type { ElementType, ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT, VIEWPORT, fadeUp } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  /** Stagger index — multiplies the base delay. */
  order?: number
  className?: string
  as?: ElementType
}

/** Soft rise on entry. Default reveal for paragraphs and small blocks. */
export function Reveal({ children, order = 0, className, as }: RevealProps) {
  const Component = motion[(as ?? 'div') as 'div']

  return (
    <Component
      className={className}
      variants={fadeUp}
      custom={order}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  )
}

/**
 * Masked line reveal for headlines: the text slides out from behind its own
 * baseline. Keep one <MaskedLine> per visual line.
 */
export function MaskedLine({
  children,
  order = 0,
  className,
}: {
  children: ReactNode
  order?: number
  className?: string
}) {
  return (
    // The trigger sits on the mask, not the moving text: a fully translated
    // child inside overflow:hidden has an empty intersection rect and would
    // never fire its own observer.
    <motion.span
      className="block overflow-hidden pb-[0.06em]"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.span
        className={`block ${className ?? ''}`}
        variants={{
          hidden: { y: '108%' },
          visible: {
            y: '0%',
            transition: { duration: 0.95, ease: EASE_OUT, delay: 0.07 * order },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Hairline that draws itself in from the left. */
export function Rule({
  className = '',
  order = 0,
  accent = false,
}: {
  className?: string
  order?: number
  accent?: boolean
}) {
  return (
    <motion.div
      className={`h-px w-full origin-left ${className}`}
      style={{ background: accent ? 'var(--accent)' : 'var(--line)' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE_IN_OUT, delay: 0.06 * order }}
    />
  )
}

/**
 * Section chapter marker: index + title on a hairline.
 * Repeating this exact pattern is what makes the site read as one system.
 */
export function SectionHeader({
  index,
  title,
  aside,
  className = '',
}: {
  index: string
  title: string
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Rule />
      <div className="flex items-baseline justify-between gap-6 pt-4">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <Reveal>
            <span className="label label--accent">{index}</span>
          </Reveal>
          <Reveal order={1}>
            <span className="label">{title}</span>
          </Reveal>
        </div>
        {/* The aside is an editorial nicety — it steps aside on small screens. */}
        {aside ? (
          <Reveal order={2} className="hidden text-right sm:block">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  )
}
