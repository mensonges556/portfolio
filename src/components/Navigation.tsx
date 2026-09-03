import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { sectionIndex, site, ui } from '../data/site'
import { lockScroll, scrollToId, scrollToTop } from '../lib/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = sectionIndex.map((s) => s.id)

export function Navigation({ ready }: { ready: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const { scrollY } = useScroll()
  const active = useActiveSection(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (value) => {
    setCondensed(value > 80)
  })

  // The mobile menu takes over the viewport, so scrolling underneath stops.
  useEffect(() => {
    lockScroll(menuOpen)
    return () => lockScroll(false)
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => {
    setMenuOpen(false)
    // Let the menu curtain start closing before the scroll begins.
    window.setTimeout(() => scrollToId(id), menuOpen ? 420 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full"
        style={{ zIndex: 'var(--z-nav)' }}
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      >
        {/* Backdrop only appears once the hero is behind us. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-[var(--line)] bg-[rgba(8,8,10,0.72)] backdrop-blur-xl"
          initial={false}
          animate={{ opacity: condensed && !menuOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />

        <nav
          aria-label={ui.navPrimary}
          className="relative flex items-center justify-between px-[var(--gutter)] py-5 sm:py-6"
        >
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="hover"
            className="group flex items-baseline gap-3"
            aria-label={ui.backToTopAria(site.name)}
          >
            <span className="text-[1.05rem] font-semibold tracking-[-0.03em] uppercase transition-colors duration-300 group-hover:text-[var(--accent)]">
              {site.name}
            </span>
            <span className="label hidden !text-[0.5625rem] text-[var(--faint)] sm:block">
              {site.role}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    data-cursor="hover"
                    className="group relative flex items-baseline gap-2 py-1"
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="label !text-[0.5625rem] text-[var(--faint)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {item.index}
                    </span>
                    <span
                      className="text-[0.9rem] tracking-[-0.01em] transition-colors duration-300 group-hover:text-[var(--accent)]"
                      style={{ color: isActive ? 'var(--accent)' : undefined }}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      style={{ transform: isActive ? 'scaleX(1)' : undefined }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="label relative z-10 flex items-center gap-2.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: menuOpen ? 'var(--accent)' : 'var(--muted)' }}
              />
            </span>
            {menuOpen ? ui.menuClose : ui.menuOpen}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>{menuOpen ? <MobileMenu onNavigate={go} /> : null}</AnimatePresence>
    </>
  )
}

function MobileMenu({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 flex flex-col justify-between bg-[var(--background)] px-[var(--gutter)] pt-28 pb-10 md:hidden"
      style={{ zIndex: 'calc(var(--z-nav) - 1)' }}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.62, ease: EASE_IN_OUT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            'radial-gradient(80% 60% at 80% 0%, var(--accent-glow) 0%, transparent 70%)',
        }}
      />

      <ul className="relative">
        {site.nav.map((item, i) => (
          <li key={item.id} className="border-b border-[var(--line)]">
            <button
              type="button"
              onClick={() => onNavigate(item.id)}
              className="flex w-full items-baseline justify-between py-5 text-left"
            >
              <span className="overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.25rem,13vw,3.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] uppercase"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.72, ease: EASE_OUT, delay: 0.16 + i * 0.06 }}
                >
                  {item.label}
                </motion.span>
              </span>
              <span className="label !text-[0.5625rem] text-[var(--faint)]">
                {item.index}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <motion.div
        className="relative flex flex-col gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.42 }}
      >
        <a href={`mailto:${site.email}`} className="link text-[1.05rem]">
          {site.email}
        </a>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} className="label link">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="label !tracking-[0.14em] text-[var(--faint)]">
          {site.location.city} · {site.availability}
        </p>
      </motion.div>
    </motion.div>
  )
}
