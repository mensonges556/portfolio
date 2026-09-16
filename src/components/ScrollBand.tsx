import { useEffect, useRef } from 'react'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export function ScrollBand() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const lastScrollY = useRef(0)
  const scrollVel = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      scrollVel.current += y - lastScrollY.current
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let frame = 0
    let last = performance.now()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const baseSpeed = reduced ? 0 : 48

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      scrollVel.current *= 0.9

      const el = trackRef.current
      if (el) {
        const extra = scrollVel.current * 12
        offsetRef.current -= (baseSpeed + extra) * dt
        const half = el.scrollWidth / 2
        if (half > 0) {
          while (offsetRef.current <= -half) offsetRef.current += half
          while (offsetRef.current > 0) offsetRef.current -= half
        }
        el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="scroll-band-slot">
    <section
      id="scroll-band"
      className="scroll-band"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{ padding: 'clamp(14px, 3vw, 22px) 0' }}
      >
        {[0, 1].map((copy) => (
          <p key={copy} className="scroll-band-copy">
            {LOREM}
          </p>
        ))}
      </div>
    </section>
    </div>
  )
}
