import type { RefObject } from 'react'
import navLogoKarla from '../../LOGO KARLA.svg'
import { NAV } from '../config/nav'
import GooeyNav from './GooeyNav'
import './DesktopNav.css'

const items = NAV.map((item) => ({
  label: item.label,
  href: item.href,
}))

type DesktopNavProps = {
  headerRef?: RefObject<HTMLElement | null>
  grabRef?: RefObject<HTMLElement | null>
}

export function DesktopNav({ headerRef, grabRef }: DesktopNavProps) {
  return (
    <div className="desktop-nav" aria-hidden={false}>
      <header
        ref={headerRef}
        className="desktop-nav-header"
        aria-label="Navigation principale"
      >
        <a href="#accueil" className="desktop-nav-logo" aria-label="Karla, accueil">
          <img src={navLogoKarla} alt="Karla" draggable={false} width={110} height={34} />
        </a>

        <div ref={grabRef} className="desktop-nav-gooey">
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </header>
    </div>
  )
}
