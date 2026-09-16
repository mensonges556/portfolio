import { cn } from '../../lib/utils'
import { motion } from 'motion/react'
import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type SVGProps,
} from 'react'

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: ReactNode
  rectangleClassName?: string
  pointerClassName?: string
  containerClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const measure = () => {
      setDimensions({
        width: node.offsetWidth,
        height: node.offsetHeight,
      })
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(node)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      className={cn('relative w-fit overflow-visible', containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <motion.div
            className={cn(
              'absolute top-0 left-0 box-border border-2 border-[#830012]',
              rectangleClassName,
            )}
            initial={{ width: 0, height: 0 }}
            animate={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute top-0 left-0"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              x: dimensions.width,
              y: dimensions.height,
            }}
            style={{ rotate: -90 }}
            transition={{
              opacity: { duration: 0.1, ease: 'easeInOut' },
              duration: 1,
              ease: 'easeInOut',
            }}
          >
            <Pointer className={cn('h-5 w-5 text-[#830012]', pointerClassName)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export function Pointer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  )
}
