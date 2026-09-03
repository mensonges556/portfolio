import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { expertise, services } from '../data/site'
import { EASE_OUT, VIEWPORT } from '../lib/motion'
import { SectionHeader } from './Reveal'

/**
 * Expertise as one interactive list, not five cards.
 * Hovering a line brings it forward, pushes the others back, and swaps a
 * large serif keyword behind the list — texture that responds to intent.
 */
export function Services() {
  const [active, setActive] = useState<string | null>(null)
  const activeService = services.find((service) => service.number === active)

  return (
    <section id="expertise" className="section shell">
      <SectionHeader
        index="04"
        title={expertise.sectionTitle}
        aside={<span className="label text-[var(--faint)]">{expertise.sectionAside}</span>}
      />

      <div className="relative pt-[clamp(2.5rem,6vw,5rem)]">
        {/* Keyword texture, desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden items-center justify-end overflow-hidden lg:flex"
        >
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.span
                key={activeService.number}
                className="serif leading-none whitespace-nowrap text-[clamp(5rem,11vw,11rem)]"
                style={{ color: 'var(--accent)' }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 0.13, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                {activeService.keyword}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <ul className="relative" onPointerLeave={() => setActive(null)}>
          {services.map((service, index) => {
            const dimmed = active !== null && active !== service.number

            return (
              <motion.li
                key={service.number}
                className="border-t border-[var(--line)] last:border-b"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE_OUT, delay: index * 0.05 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {/* Focusable so keyboard users get the same disclosure that
                    hover provides — otherwise the detail is unreachable. */}
                <div
                  className="group relative outline-offset-8"
                  onPointerEnter={() => setActive(service.number)}
                  onFocus={() => setActive(service.number)}
                  tabIndex={0}
                  aria-label={`${service.title} — ${service.description}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100 group-hover:scale-x-100"
                  />

                  <div
                    className="grid-12 items-baseline gap-y-3 py-6 transition-opacity duration-500 md:py-8"
                    style={{ opacity: dimmed ? 0.32 : 1 }}
                  >
                    <span className="label col-span-2 !text-[0.625rem] transition-colors duration-300 group-hover:text-[var(--accent)] md:col-span-1">
                      {service.number}
                    </span>

                    <h3 className="col-span-10 md:col-span-5">
                      <span className="block text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.02] font-medium tracking-[-0.025em] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.12em]">
                        {service.title}
                      </span>
                    </h3>

                    {/* Detail is held back until a line is actually asked
                        about; on touch there is no hover, so it stays open. */}
                    <p className="col-span-12 max-w-[42ch] text-[0.9375rem] text-pretty text-[var(--muted)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-4 md:col-start-7 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {service.description}
                    </p>

                    <ul className="col-span-12 flex flex-wrap gap-x-4 gap-y-1 transition-all delay-75 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-2 md:col-start-11 md:flex-col md:text-right lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {service.deliverables.map((item) => (
                        <li key={item} className="label !text-[0.5625rem] text-[var(--faint)]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
