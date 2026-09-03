import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { projects } from '../data/projects'
import { work } from '../data/site'
import { EASE_OUT } from '../lib/motion'
import { ProjectRow } from './ProjectRow'
import { ProjectVisual } from './ProjectVisual'
import { useIsDesktop } from '../hooks/useMediaQuery'

/**
 * The project index: an editorial list rather than a grid of cards.
 * On desktop a single preview panel tracks the pointer and swaps its
 * contents as rows are entered.
 */
export function ProjectIndex() {
  const [hovered, setHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 170, damping: 22, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 170, damping: 22, mass: 0.5 })

  const showPreview = isDesktop && !reduced
  const activeProject = projects.find((project) => project.slug === hovered)

  /**
   * The preview glides vertically with the pointer but stays parked in the
   * right half of the list, clear of the titles. A fraction of the
   * horizontal movement is kept so it never feels bolted down.
   */
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!showPreview || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const drift = (event.clientX - rect.left - rect.width / 2) * 0.06
    rawX.set(rect.width * 0.73 + drift)
    rawY.set(event.clientY - rect.top)
  }

  return (
    <div
      ref={containerRef}
      className="relative pt-[clamp(3rem,7vw,6rem)]"
      onPointerMove={onPointerMove}
    >
      <div className="flex items-baseline justify-between gap-6 pb-5">
        <span className="label">{work.indexLabel}</span>
        <span className="label text-[var(--faint)]">
          {work.indexCount(projects.length + 1)}
        </span>
      </div>

      <ul>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            order={index}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </ul>
      <div className="hairline" />

      {showPreview ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10"
          style={{ x, y }}
        >
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.slug}
                className="w-[22vw] max-w-[340px] min-w-[220px] overflow-hidden"
                style={{ x: '-50%', y: '-50%', aspectRatio: '4 / 5' }}
                initial={{ opacity: 0, scale: 0.94, clipPath: 'inset(0% 0% 100% 0%)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 0, scale: 0.96, clipPath: 'inset(0% 0% 100% 0%)' }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <ProjectVisual
                  variant={activeProject.visual}
                  caption={work.visualCaption(activeProject.number)}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  )
}
