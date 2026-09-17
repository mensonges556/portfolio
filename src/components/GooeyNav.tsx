import { useEffect, useRef, useState, type MouseEvent } from 'react'
import './GooeyNav.css'

export type GooeyNavItem = {
  label: string
  href: string
}

type GooeyNavProps = {
  items?: GooeyNavItem[]
  animationTime?: number
  particleCount?: number
  particleDistances?: [number, number]
  particleR?: number
  timeVariance?: number
  colors?: number[]
  initialActiveIndex?: number
  className?: string
}

type ParticleSpec = {
  start: [number, number]
  end: [number, number]
  time: number
  scale: number
  color: number
  rotate: number
}

export default function GooeyNav({
  items = [],
  animationTime = 600,
  particleCount = 12,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  className = '',
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLSpanElement>(null)
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const noise = (n = 1) => n / 2 - Math.random() * n

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)] as const
  }

  const createParticle = (i: number, t: number, d: [number, number], r: number): ParticleSpec => {
    const rotate = noise(r / 10)
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    }
  }

  const positionBurst = (element: HTMLElement) => {
    if (!containerRef.current || !burstRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const pos = element.getBoundingClientRect()
    Object.assign(burstRef.current.style, {
      left: `${pos.x - containerRect.x + pos.width / 2}px`,
      top: `${pos.y - containerRect.y + pos.height / 2}px`,
    })
  }

  const makeParticles = () => {
    const host = burstRef.current
    if (!host) return

    host.querySelectorAll('.particle').forEach((p) => p.remove())

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2)
      const p = createParticle(i, t, particleDistances, particleR)

      window.setTimeout(() => {
        const particle = document.createElement('span')
        const point = document.createElement('span')
        particle.className = 'particle'
        particle.style.setProperty('--start-x', `${p.start[0]}px`)
        particle.style.setProperty('--start-y', `${p.start[1]}px`)
        particle.style.setProperty('--end-x', `${p.end[0]}px`)
        particle.style.setProperty('--end-y', `${p.end[1]}px`)
        particle.style.setProperty('--time', `${p.time}ms`)
        particle.style.setProperty('--scale', `${p.scale}`)
        particle.style.setProperty('--color', `var(--color-${p.color}, #830012)`)
        particle.style.setProperty('--rotate', `${p.rotate}deg`)
        point.className = 'point'
        particle.appendChild(point)
        host.appendChild(particle)
        window.setTimeout(() => {
          particle.remove()
        }, t)
      }, i * 18)
    }
  }

  const selectItem = (index: number, liEl: HTMLLIElement) => {
    if (activeIndex === index) return
    setActiveIndex(index)
    positionBurst(liEl)
    makeParticles()
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget.parentElement
    if (!liEl) return
    selectItem(index, liEl)
  }

  useEffect(() => {
    const activeLi = containerRef.current?.querySelectorAll('li')[activeIndex]
    if (activeLi) positionBurst(activeLi)
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      className={`gooey-nav-container gooey-nav-karla ${className}`.trim()}
    >
      <nav aria-label="Navigation principale">
        <ul>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? 'active' : ''}>
              <a href={item.href} onClick={(e) => handleClick(e, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span ref={burstRef} className="gooey-nav-burst" aria-hidden="true" />
    </div>
  )
}
