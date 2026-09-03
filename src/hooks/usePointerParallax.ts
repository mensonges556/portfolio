import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Pointer position normalised to -0.5 … 0.5 on both axes, spring-smoothed.
 * Used for the hero's depth response. Returns static values when the user
 * asked for reduced motion or has no fine pointer.
 */
export function usePointerParallax(stiffness = 55, damping = 18) {
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness, damping, mass: 0.6 })
  const y = useSpring(rawY, { stiffness, damping, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX / window.innerWidth - 0.5)
      rawY.set(event.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [rawX, rawY, reduced])

  return { x, y }
}
