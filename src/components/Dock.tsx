import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

const SIZE = 46
const MAGNIFICATION = 68
const DISTANCE = 120

const TOOLS = [
  { name: 'Photoshop', src: '/icons/photoshop.png' },
  { name: 'Illustrator', src: '/icons/illustrator.png' },
  { name: 'InDesign', src: '/icons/indesign.png' },
  { name: 'Premiere Pro', src: '/icons/premiere.png' },
  { name: 'After Effects', src: '/icons/aftereffects.png' },
]

function DockIcon({
  mouseX,
  src,
  name,
}: {
  mouseX: MotionValue<number>
  src: string
  name: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(
    distanceCalc,
    [-DISTANCE, 0, DISTANCE],
    [SIZE, MAGNIFICATION, SIZE],
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      title={name}
      style={{ width: scaleSize, height: scaleSize }}
      className="cv-dock-icon"
    >
      <img src={src} alt={name} draggable={false} />
    </motion.div>
  )
}

export function AppDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      className="cv-macos-dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {TOOLS.map((tool) => (
        <DockIcon key={tool.name} mouseX={mouseX} src={tool.src} name={tool.name} />
      ))}
    </motion.div>
  )
}
