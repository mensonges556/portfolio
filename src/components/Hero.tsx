import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate as motionAnimate,
  type MotionValue,
} from 'motion/react'
import logoKarla from '../../Fichier 10.svg'
import heroPortrait from '../../hero.png'
import heroBg from '../../3D.png'
import Grainient from './Grainient'
import { NAV } from '../config/nav'
import { LogoMark, BurgerButton, MobileMenu } from './MobileMenu'
import { Pointer } from './ui/pointer-highlight'

const MOBILE_NAV = NAV.map((item) => ({ label: item.label, href: item.href }))

const ease = [0.22, 1, 0.36, 1] as const
const scrubEase = [0.16, 1, 0.3, 1] as const
const dragEase = [0.2, 0.8, 0.2, 1] as const
const NAV_FROM = { x: 64, y: -110 }

function OpacityField({ value }: { value: MotionValue<number> }) {
  const [pct, setPct] = useState(0)
  useMotionValueEvent(value, 'change', (v) => setPct(Math.round(v)))
  return <span className="ps-opacity-field">{pct}%</span>
}

function pointIn(
  hero: HTMLElement,
  el: HTMLElement,
  ox: number,
  oy: number,
) {
  const a = el.getBoundingClientRect()
  const h = hero.getBoundingClientRect()
  return { x: a.left - h.left + ox, y: a.top - h.top + oy }
}

type HeroProps = {
  desktopNavHeaderRef?: RefObject<HTMLElement | null>
  desktopNavGrabRef?: RefObject<HTMLElement | null>
}

export function Hero({ desktopNavHeaderRef, desktopNavGrabRef }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const navElRef = useRef<HTMLElement>(null)
  const navGrabRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [cursorRef, animate] = useAnimate()
  const [navReady, setNavReady] = useState(false)
  const [showBar, setShowBar] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const opacity = useMotionValue(0)
  const layerOpacity = useTransform(opacity, [0, 100], [0, 1])
  const knobLeft = useTransform(opacity, [0, 100], ['0%', '100%'])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      opacity.set(100)
      setNavReady(true)
      setShowBar(false)
      const nav = navElRef.current
      const desktopNav = desktopNavHeaderRef?.current
      if (nav) animate(nav, { opacity: 1, x: 0, y: 0 }, { duration: 0 })
      if (desktopNav) {
        animate(desktopNav, { opacity: 1, x: 0, y: 0 }, { duration: 0 })
        desktopNav.style.pointerEvents = ''
      }
      return
    }

    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const run = async () => {
      await wait(280)
      await new Promise((r) => requestAnimationFrame(() => r(null)))

      const hero = heroRef.current
      const cursor = cursorRef.current
      const mobileNav = window.matchMedia('(max-width: 899px)').matches
      const nav = mobileNav ? navElRef.current : desktopNavHeaderRef?.current ?? null
      const navGrab = mobileNav
        ? navGrabRef.current
        : desktopNavGrabRef?.current ?? null
      const panel = panelRef.current
      const track = trackRef.current
      if (!hero || !cursor || !panel || !track || cancelled) return

      if (nav) {
        nav.style.pointerEvents = 'none'
        await animate(
          nav,
          { opacity: 0, x: NAV_FROM.x, y: NAV_FROM.y, scale: 1 },
          { duration: 0 },
        )
      }
      if (cancelled) return

      const startX = hero.clientWidth * 0.48
      const startY = hero.clientHeight * 0.5
      await animate(
        cursor,
        { opacity: 1, x: startX, y: startY },
        { duration: 0.32, ease },
      )
      if (cancelled) return
      await wait(100)

      if (nav && navGrab) {
        const pick = pointIn(
          hero,
          navGrab,
          navGrab.offsetWidth - 22,
          navGrab.offsetHeight * 0.55,
        )
        await animate(cursor, { x: pick.x, y: pick.y }, { duration: 0.55, ease })
        if (cancelled) return

        await animate(nav, { opacity: 1, scale: 1.03 }, { duration: 0.14 })
        await animate(cursor, { scale: 0.88 }, { duration: 0.12 })
        await wait(70)
        if (cancelled) return

        const drop = { x: pick.x - NAV_FROM.x, y: pick.y - NAV_FROM.y }
        await Promise.all([
          animate(cursor, { x: drop.x, y: drop.y }, { duration: 0.78, ease: dragEase }),
          animate(nav, { x: 0, y: 0, scale: 1 }, { duration: 0.78, ease: dragEase }),
        ])
        if (cancelled) return

        await animate(cursor, { scale: 1 }, { duration: 0.16 })
        nav.style.pointerEvents = ''
        setNavReady(true)
        await wait(180)
      } else {
        setNavReady(true)
      }
      if (cancelled) return

      await animate(panel, { opacity: 0, y: 14, scale: 0.97, filter: 'blur(8px)' }, { duration: 0 })
      await animate(
        panel,
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        {
          opacity: { duration: 0.52, ease },
          y: { duration: 0.55, ease },
          scale: { duration: 0.55, ease },
          filter: { duration: 0.42, ease },
        },
      )
      if (cancelled) return

      await wait(80)
      const grabY = track.offsetHeight * 0.5
      const pick = pointIn(hero, track, 4, grabY)
      await animate(cursor, { x: pick.x, y: pick.y }, { duration: 0.32, ease })
      if (cancelled) return

      await animate(cursor, { scale: 0.88 }, { duration: 0.08 })
      await wait(40)
      if (cancelled) return

      const drop = pointIn(hero, track, track.offsetWidth - 4, grabY)
      await Promise.all([
        motionAnimate(opacity, 100, { duration: 0.85, ease: scrubEase }),
        animate(cursor, { x: drop.x, y: drop.y }, { duration: 0.85, ease: scrubEase }),
      ])
      if (cancelled) return

      await animate(cursor, { scale: 1 }, { duration: 0.12 })
      await wait(280)
      if (cancelled) return

      await Promise.all([
        animate(
          panel,
          { opacity: 0, scale: 0.86, y: 22, filter: 'blur(10px)' },
          {
            opacity: { duration: 0.52, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 0.46, ease: [0.45, 0, 1, 1] },
          },
        ),
        animate(
          cursor,
          { x: drop.x + 32, y: drop.y + 40, opacity: 0, scale: 0.9 },
          {
            x: { duration: 0.52, ease },
            y: { duration: 0.52, ease },
            scale: { duration: 0.45, ease },
            opacity: { duration: 0.4, delay: 0.12, ease: [0.4, 0, 1, 1] },
          },
        ),
      ])
      if (!cancelled) setShowBar(false)
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [animate, cursorRef, opacity, desktopNavHeaderRef, desktopNavGrabRef])

  return (
    <div
      id="accueil"
      ref={heroRef}
      className="relative w-full min-w-0 min-h-[100svh] overflow-visible"
    >
      <div className="hero-bg absolute inset-0 z-0" aria-hidden="true">
        <div className="hero-bg-grain">
          <Grainient
            color1="#fc81ff"
            color2="#d3d3d3"
            color3="#fc81ff"
            timeSpeed={0.25}
            colorBalance={0.0}
            warpStrength={1.0}
            warpFrequency={5.0}
            warpSpeed={2.0}
            warpAmplitude={50.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.1}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.5}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>
        <motion.img
          src={heroBg}
          alt=""
          className="hero-bg-img"
          draggable={false}
          style={{ opacity: layerOpacity }}
        />
      </div>
      <motion.div
        ref={cursorRef}
        className="hero-intro-cursor"
        initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
        aria-hidden="true"
      >
        <Pointer className="h-7 w-7 text-[#830012] -rotate-90" />
      </motion.div>

      <motion.nav
        ref={navElRef}
        className="site-nav nav-mobile-only absolute top-0 left-0 right-0 z-30"
        initial={{ opacity: 0, x: NAV_FROM.x, y: NAV_FROM.y, scale: 1 }}
        style={{ pointerEvents: navReady ? 'auto' : 'none' }}
      >
        <LogoMark className="shrink-0" />

        <div ref={navGrabRef} className="flex items-center justify-end min-w-0">
          <BurgerButton onClick={() => setMenuOpen(true)} />
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} items={MOBILE_NAV} />

      <div className="relative z-20 min-h-[100svh] min-w-0 w-full flex flex-col">
        <div className="h-[64px] sm:h-[72px] shrink-0" />

        <div className="hero-shell">
          <div className="hero-media-slot" id="projets">
            <div className="hero-brand">
              <motion.img
                src={logoKarla}
                alt="Karla"
                className="hero-logo"
                style={{ opacity: layerOpacity }}
              />
              <motion.p
                className="hero-tagline"
                style={{ opacity: layerOpacity }}
              >
                Sharp ideas only.
              </motion.p>
            </div>
          </div>

          {showBar && (
            <div className="ps-opacity-wrap">
              <motion.div
                ref={panelRef}
                className="ps-opacity"
                initial={{ opacity: 0, y: 14, scale: 0.97, filter: 'blur(8px)' }}
                aria-hidden="true"
              >
                <div className="ps-opacity-row">
                  <span className="ps-opacity-label">Opacité</span>
                  <OpacityField value={opacity} />
                </div>
                <div ref={trackRef} className="ps-opacity-track">
                  <div className="ps-opacity-rail" />
                  <motion.div className="ps-opacity-knob" style={{ left: knobLeft }} />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="hero-peek-wrap"
        style={{ opacity: layerOpacity }}
        aria-hidden="true"
      >
        <img src={heroPortrait} alt="" className="hero-peek" draggable={false} />
      </motion.div>
    </div>
  )
}
