/* ------------------------------------------------------------------
   Smooth scroll singleton (Lenis).
   Lenis drives the native scroll position, so scroll-linked animations
   from `motion` keep working without extra wiring.
   ------------------------------------------------------------------ */

import Lenis from 'lenis'

let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  lenis = new Lenis({
    duration: 1.05,
    // Long, gentle tail — the signature of a premium scroll feel.
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    // Native momentum on touch devices beats a JS approximation.
    smoothWheel: true,
    syncTouch: false,
  })

  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function lockScroll(locked: boolean) {
  document.body.dataset.scrollLocked = String(locked)
  if (locked) lenis?.stop()
  else lenis?.start()
}

export function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 })
  } else {
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0 })
}
