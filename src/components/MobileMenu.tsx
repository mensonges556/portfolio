import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import logoKarla from '../../Fichier 10.svg'
import navLogoKarla from '../../LOGO KARLA.svg'

const ease = [0.22, 1, 0.36, 1] as const

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      src={navLogoKarla}
      alt="Karla"
      className={`nav-logo ${className}`}
      draggable={false}
    />
  )
}

export function BurgerButton({
  onClick,
  className = '',
}: {
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      className={`nav-icon nav-burger ${className}`}
      aria-label="Ouvrir le menu"
      onClick={onClick}
    >
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="26" height="3" rx="1.5" fill="#830012" />
        <rect x="1" y="7.5" width="26" height="3" rx="1.5" fill="#830012" />
        <rect x="1" y="13" width="26" height="3" rx="1.5" fill="#830012" />
      </svg>
    </button>
  )
}

export function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: { label: string; href: string }[]
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease }}
        >
          <motion.div
            className="mobile-menu-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <header className="site-nav mobile-menu-head">
              <LogoMark className="shrink-0" />
              <button
                ref={closeRef}
                type="button"
                className="nav-icon"
                aria-label="Fermer le menu"
                onClick={onClose}
              >
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true">
                  <path
                    d="M2 1.5l24 15M26 1.5L2 16.5"
                    stroke="#830012"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <nav className="mobile-menu-list">
              {items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-link"
                  onClick={onClose}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mobile-menu-fill" aria-hidden="true">
              <img src={logoKarla} alt="" className="mobile-menu-mark" />
            </div>

            <footer className="mobile-menu-foot">
              <img src={logoKarla} alt="Karla" className="mobile-menu-foot-logo" />
              <p className="mobile-menu-foot-kicker">À propos</p>
              <p className="mobile-menu-foot-tag">Sharp ideas only.</p>
              <a
                className="mobile-menu-foot-link"
                href="https://www.behance.net/melamicosa"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
