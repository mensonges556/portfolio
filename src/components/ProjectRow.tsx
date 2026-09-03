import { motion } from 'motion/react'
import type { Project } from '../data/projects'
import { ui } from '../data/site'
import { EASE_OUT, VIEWPORT } from '../lib/motion'
import { ProjectVisual } from './ProjectVisual'

type Props = {
  project: Project
  order: number
  /** Null when nothing is hovered; used to dim the rows that aren't active. */
  hovered: string | null
  onHover: (slug: string | null) => void
}

/**
 * One line of the project index. Reads as a typographic entry, not a card.
 * Desktop hover: the row lifts out of the list while its siblings recede.
 * Mobile: the visual is inline, since there is no hover to reveal it.
 */
export function ProjectRow({ project, order, hovered, onHover }: Props) {
  const dimmed = hovered !== null && hovered !== project.slug

  return (
    <motion.li
      className="border-t border-[var(--line)]"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: order * 0.06 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <a
        href="#work"
        aria-label={`${project.title} — ${project.category}, ${project.year} (provisoire)`}
        data-cursor="label"
        data-cursor-label={ui.cursor.open}
        className="group relative block"
        onPointerEnter={() => onHover(project.slug)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(project.slug)}
        onBlur={() => onHover(null)}
      >
        {/* Accent rule that draws across the top edge of the active row */}
        <span
          aria-hidden="true"
          className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />

        {/* Title and metadata are kept to the left half: the right half is
            the stage for the pointer-tracked preview. */}
        <div
          className="grid-12 items-baseline gap-y-3 py-7 transition-opacity duration-500 md:py-9"
          style={{ opacity: dimmed ? 0.3 : 1 }}
        >
          <span className="label col-span-2 !text-[0.625rem] transition-colors duration-300 group-hover:text-[var(--accent)] md:col-span-1">
            {project.number}
          </span>

          <div className="col-span-10 flex flex-col gap-2.5 md:col-span-6">
            <h3>
              <span className="block text-[clamp(1.75rem,4.6vw,3.4rem)] leading-[0.95] font-medium tracking-[-0.03em] uppercase transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.14em] md:group-hover:translate-x-[0.18em]">
                {project.title}
              </span>
            </h3>

            <p className="label flex flex-wrap items-center gap-x-3">
              <span>{project.category}</span>
              <span className="text-[var(--faint)]">/</span>
              <span className="text-[var(--faint)]">{project.year}</span>
            </p>
          </div>

          <span
            aria-hidden="true"
            className="col-span-1 col-start-12 justify-self-end self-center text-[var(--faint)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[var(--accent)]"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 15 15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </span>
        </div>

        {/* Mobile-only visual: hover-reveal has no equivalent on touch. */}
        <div className="mb-7 lg:hidden">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
            <ProjectVisual variant={project.visual} />
          </div>
        </div>
      </a>
    </motion.li>
  )
}
