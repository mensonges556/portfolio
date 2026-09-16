import type { RefObject } from 'react'
import navLogoKarla from '../../LOGO KARLA.svg'
import { NAV, NAV_SOCIALS } from '../config/nav'
import { StaggeredMenu } from './StaggeredMenu'

const menuItems = NAV.map((item) => ({
  label: item.label,
  ariaLabel: item.ariaLabel,
  link: item.href,
}))

const socialItems = NAV_SOCIALS.map((item) => ({
  label: item.label,
  link: item.link,
}))

type DesktopNavProps = {
  headerRef?: RefObject<HTMLElement | null>
  toggleRef?: RefObject<HTMLButtonElement | null>
}

export function DesktopNav({ headerRef, toggleRef }: DesktopNavProps) {
  return (
    <div className="desktop-nav" aria-hidden={false}>
      <StaggeredMenu
        isFixed
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        logoUrl={navLogoKarla}
        colors={['#ffc9ec', '#e179be', '#830012']}
        menuButtonColor="#830012"
        openMenuButtonColor="#830012"
        accentColor="#830012"
        changeMenuColorOnOpen={false}
        headerRef={headerRef}
        toggleRef={toggleRef}
      />
    </div>
  )
}
