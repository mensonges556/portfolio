import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { EASE_OUT } from '../lib/motion'
import { ui } from '../data/site'
import { useIsPointerFine } from '../hooks/useMediaQuery'

type CursorMode = 'default' | 'hover' | 'label'

const RING_SIZE: Record<CursorMode, number> = {
  default: 30,
  hover: 60,
  label: 84,
}

/**
 * Trailing custom cursor — desktop / fine-pointer only.
 *
 * Any element can drive it declaratively:
 *   data-cursor="hover"                            → ring expands
 *   data-cursor="label" data-cursor-label="View"    → filled accent pill
 *   data-cursor="none"                             → force default state
 *
 * A single delegated listener at document level keeps the rest of the tree
 * unaware that the cursor exists.
 */
export function CustomCursor() {
  const pointerFine = useIsPointerFine()
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  // The ring lags behind the dot — that delay is what reads as "considered".
  const ringX = useSpring(x, { stiffness: 230, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 230, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (!pointerFine) return

    document.body.dataset.customCursor = 'true'

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button',
      )
      const declared = target?.dataset.cursor

      if (!target || declared === 'none') {
        setMode('default')
        setLabel('')
        return
      }

      if (declared === 'label') {
        setMode('label')
        setLabel(target.dataset.cursorLabel ?? ui.cursor.view)
        return
      }

      setMode('hover')
      setLabel('')
    }

    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      delete document.body.dataset.customCursor
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [pointerFine, x, y])

  if (!pointerFine) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden lg:block"
      style={{ zIndex: 'var(--z-cursor)' }}
    >
      {/* Trailing ring, doubles as a label pill */}
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="grid place-items-center rounded-full border"
          style={{ x: '-50%', y: '-50%' }}
          initial={false}
          animate={{
            width: RING_SIZE[mode],
            height: RING_SIZE[mode],
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.88 : 1,
            borderColor:
              mode === 'label' ? 'rgba(255,169,255,0)' : 'rgba(242,240,238,0.4)',
            backgroundColor:
              mode === 'label'
                ? 'rgba(255,169,255,1)'
                : mode === 'hover'
                  ? 'rgba(255,169,255,0.09)'
                  : 'rgba(242,240,238,0)',
          }}
          transition={{ duration: 0.34, ease: EASE_OUT }}
        >
          <motion.span
            className="label whitespace-nowrap"
            style={{ color: '#08080A' }}
            animate={{ opacity: mode === 'label' ? 1 : 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Precise accent dot, zero lag */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x,
          y,
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          background: 'var(--accent)',
        }}
        animate={{ opacity: visible && mode === 'default' ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      />
    </div>
  )
}
