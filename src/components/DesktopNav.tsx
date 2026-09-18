import { useEffect, useState, type RefObject } from 'react'

import logoPdp from '../../pdpey.png'

import { NAV } from '../config/nav'

import { PillNav } from './PillNav'

import './DesktopNav.css'

import './PillNav.css'



const items = NAV.map((item) => ({

  label: item.label,

  href: item.href,

  ariaLabel: item.ariaLabel,

}))



type DesktopNavProps = {

  headerRef?: RefObject<HTMLElement | null>

  grabRef?: RefObject<HTMLElement | null>

}



export function DesktopNav({ headerRef, grabRef }: DesktopNavProps) {

  const [activeHref, setActiveHref] = useState('#accueil')



  useEffect(() => {

    const sync = () => {

      setActiveHref(window.location.hash || '#accueil')

    }

    sync()

    window.addEventListener('hashchange', sync)

    return () => window.removeEventListener('hashchange', sync)

  }, [])



  return (

    <div className="desktop-nav" aria-hidden={false}>

      <header

        ref={headerRef}

        className="desktop-nav-header"

        aria-label="Navigation principale"

      >

        <div ref={grabRef} className="desktop-nav-pill">

          <PillNav

            logo={logoPdp}

            logoHref="#accueil"

            logoAlt="Karla"

            items={items}

            activeHref={activeHref}

            baseColor="#830012"

            pillColor="#f9f6f5"

            pillTextColor="#830012"

            hoveredPillTextColor="#ffffff"

            initialLoadAnimation={false}

            className="desktop-nav-pillnav"

          />

        </div>

      </header>

    </div>

  )

}


