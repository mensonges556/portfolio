import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

export type PillNavProps = {
  logo: ReactNode | string
  logoHref?: string
  logoAlt?: string
  items: PillNavItem[]
  activeHref?: string
  className?: string
  ease?: string
  baseColor?: string
  pillColor?: string
  hoveredPillTextColor?: string
  pillTextColor?: string
  onMobileMenuClick?: () => void
  initialLoadAnimation?: boolean
}

export function PillNav({
  logo,
  logoHref = '#accueil',
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#830012',
  pillColor = '#f9f6f5',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#830012',
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])
  const logoSpinRef = useRef<HTMLElement | null>(null)
  const logoTweenRef = useRef<gsap.core.Tween | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLAnchorElement | null>(null)

  const renderLogo = () => {
    if (typeof logo === 'string') {
      return (
        <img
          src={logo}
          alt={logoAlt}
          className="pill-nav-logo-img pointer-events-none"
          draggable={false}
        />
      )
    }
    return <div className="pill-nav-logo-mark">{logo}</div>
  }

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return

        const pill = circle.parentElement
        const rect = pill.getBoundingClientRect()
        const { width: w, height: h } = rect

        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        })

        const label = pill.querySelector<HTMLElement>('.pill-label')
        const white = pill.querySelector<HTMLElement>('.pill-label-hover')

        if (label) gsap.set(label, { y: 0 })
        if (white) gsap.set(white, { y: h + 8, opacity: 0 })

        tlRefs.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 0.8, ease, overwrite: 'auto' },
          0,
        )

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.6, ease, overwrite: 'auto' }, 0)
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 10), opacity: 0 })
          tl.to(white, { y: 0, opacity: 1, duration: 0.6, ease, overwrite: 'auto' }, 0)
        }

        tlRefs.current[index] = tl
      })

      if (logoSpinRef.current) {
        logoSpinRef.current = logoRef.current?.querySelector('.pill-nav-logo-img, .pill-nav-logo-mark') ?? null
      }
    }

    layout()

    const onResize = () => layout()
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(layout).catch(() => {})

    if (initialLoadAnimation) {
      const logoEl = logoRef.current
      const navItems = navItemsRef.current

      if (logoEl) {
        gsap.set(logoEl, { scale: 0, opacity: 0 })
        gsap.to(logoEl, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
      }

      if (navItems) {
        const listItems = navItems.querySelectorAll('li')
        gsap.set(listItems, { opacity: 0, x: -20 })
        gsap.to(listItems, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2,
        })
      }
    }

    return () => window.removeEventListener('resize', onResize)
  }, [items, ease, initialLoadAnimation])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.4,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLogoEnter = () => {
    const target =
      logoSpinRef.current ??
      logoRef.current?.querySelector<HTMLElement>('.pill-nav-logo-img, .pill-nav-logo-mark')
    if (!target) return
    logoTweenRef.current?.kill()
    logoTweenRef.current = gsap.to(target, {
      rotate: 360,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
      onComplete: () => gsap.set(target, { rotate: 0 }),
    })
  }

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)

    const menu = mobileMenuRef.current
    if (!menu) return

    if (newState) {
      gsap.set(menu, { display: 'block', opacity: 0, y: -20 })
      gsap.to(menu, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' })
        },
      })
    }
    onMobileMenuClick?.()
  }

  const cssVars = {
    '--pill-nav-base': baseColor,
    '--pill-nav-pill-bg': pillColor,
    '--pill-nav-hover-text': hoveredPillTextColor,
    '--pill-nav-text': pillTextColor,
  } as CSSProperties

  return (
    <div className={`pill-nav-root ${className}`.trim()} style={cssVars}>
      <nav className="pill-nav-bar" aria-label="Navigation principale">
        <a
          ref={logoRef}
          href={logoHref}
          className="pill-nav-logo-link"
          aria-label="Karla, accueil"
          onMouseEnter={handleLogoEnter}
        >
          {renderLogo()}
        </a>

        <div ref={navItemsRef} className="pill-nav-desktop">
          <ul className="pill-nav-list" role="menubar">
            {items.map((item, i) => {
              return (
                <li key={item.href} role="none">
                  <a
                    role="menuitem"
                    href={item.href}
                    className="pill-nav-pill"
                    aria-label={item.ariaLabel ?? item.label}
                    aria-current={activeHref === item.href ? 'page' : undefined}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="pill-nav-hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el
                      }}
                    />
                    <span className="pill-nav-label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={isMobileMenuOpen}
          className="pill-nav-mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div ref={mobileMenuRef} className="pill-nav-mobile-menu">
        <ul className="pill-nav-mobile-list">
          {items.map((item) => {
            const isActive = activeHref === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={isActive ? 'is-active' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
