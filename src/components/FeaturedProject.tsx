import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { featuredProject as project } from '../data/projects'
import { ui, work } from '../data/site'
import { ProjectVisual } from './ProjectVisual'
import { MaskedLine, Reveal } from './Reveal'

/**
 * The featured case study. Given far more room than the index rows, with
 * three scroll-linked layers: the frame reveals, the visual inside it
 * settles from an over-scale, and the title drifts against the scroll.
 */
export function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const visualScale = useTransform(scrollYProgress, [0, 0.55], [1.14, 1])
  const visualY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const titleX = useTransform(scrollYProgress, [0, 1], ['-1.5vw', '1.5vw'])
  const metaOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1])

  return (
    <article ref={ref} className="pt-[clamp(3rem,7vw,6rem)]">
      <div className="flex items-baseline justify-between gap-6 pb-5">
        <Reveal>
          <span className="label label--accent">{work.featuredLabel}</span>
        </Reveal>
        <Reveal order={1}>
          <span className="label text-[var(--faint)]">
            {project.number} — {project.year}
          </span>
        </Reveal>
      </div>

      {/* Title, drifting slightly against the scroll direction.
          Sized to hold one line so the visual stays the hero of the block. */}
      <motion.h3
        className="font-semibold uppercase"
        style={{
          x: titleX,
          fontSize: 'clamp(2.5rem, 8.6vw, 7.5rem)',
          lineHeight: 0.9,
          letterSpacing: 'var(--tracking-display)',
        }}
      >
        <MaskedLine>{project.title}</MaskedLine>
      </motion.h3>

      <a
        href="#work"
        aria-label={`${project.title} — ${project.category}, ${project.year} (provisoire)`}
        data-cursor="label"
        data-cursor-label={ui.cursor.open}
        className="group mt-6 block sm:mt-8"
      >
        <motion.div
          className="visual-frame"
          style={{ '--frame-ratio': project.ratio } as React.CSSProperties}
          initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0.4 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            style={{ scale: visualScale, y: visualY }}
          >
            <ProjectVisual
              variant={project.visual}
              caption={work.visualCaption(project.number)}
            />
          </motion.div>

          {/* Accent hairline that draws across the bottom edge on hover */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        </motion.div>
      </a>

      <motion.div className="grid-12 gap-y-8 pt-7" style={{ opacity: metaOpacity }}>
        <p className="col-span-12 max-w-[46ch] text-[1.0625rem] text-pretty text-[var(--muted)] md:col-span-5">
          {project.description}
        </p>

        <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 md:col-span-4 md:col-start-7 md:flex-col md:gap-y-2">
          {project.tags.map((tag) => (
            <li key={tag} className="label">
              {tag}
            </li>
          ))}
        </ul>

        <div className="col-span-12 md:col-span-2 md:col-start-11 md:text-right">
          <span className="label text-[var(--faint)]">{project.category}</span>
        </div>
      </motion.div>
    </article>
  )
}
