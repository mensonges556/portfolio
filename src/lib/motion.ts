/* ------------------------------------------------------------------
   Motion language.
   Every animation in the site pulls its easing and duration from here
   so the whole experience shares one rhythm: calm, quick, ease-out
   with an occasional micro-overshoot.
   ------------------------------------------------------------------ */

import type { Transition, Variants } from 'motion/react'

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1]
export const EASE_OVERSHOOT: [number, number, number, number] = [0.34, 1.28, 0.44, 1]

export const DUR = {
  xs: 0.18,
  sm: 0.28,
  md: 0.52,
  lg: 0.9,
} as const

export const transition = {
  fast: { duration: DUR.sm, ease: EASE_OUT } satisfies Transition,
  base: { duration: DUR.md, ease: EASE_OUT } satisfies Transition,
  slow: { duration: DUR.lg, ease: EASE_OUT } satisfies Transition,
  overshoot: { duration: 0.7, ease: EASE_OVERSHOOT } satisfies Transition,
}

/** Viewport config shared by every scroll reveal. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const

/** Masked line reveal — the workhorse for headlines. */
export const lineReveal: Variants = {
  hidden: { y: '105%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.95, ease: EASE_OUT, delay: 0.06 * i },
  }),
}

/** Soft rise used for paragraphs, metadata and small blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.05 * i },
  }),
}

/** Hairlines draw in from the left. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number = 0) => ({
    scaleX: 1,
    transition: { duration: 1, ease: EASE_IN_OUT, delay: 0.05 * i },
  }),
}

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})
