import { useRef, useState } from 'react'
import { useScrollLock } from './hooks/useScrollLock'
import { BelowCvGallery } from './components/BelowCvGallery'
import { Curriculum } from './components/Curriculum'
import { DesktopNav } from './components/DesktopNav'
import { Hero } from './components/Hero'
import { ContactFooter } from './components/ContactFooter'
import { HireToast } from './components/HireToast'
import { ScrollBand } from './components/ScrollBand'
import { HeroCvBackdrop } from './components/HeroCvBackdrop'

export default function App() {
  const desktopNavHeaderRef = useRef<HTMLElement>(null)
  const desktopNavGrabRef = useRef<HTMLElement>(null)
  const [heroIntroLocked, setHeroIntroLocked] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useScrollLock(heroIntroLocked)

  return (
    <div className="min-w-0 max-w-full">
      <DesktopNav headerRef={desktopNavHeaderRef} grabRef={desktopNavGrabRef} />
      <div className="hero-cv-stack">
        <HeroCvBackdrop />
        <Hero
          desktopNavHeaderRef={desktopNavHeaderRef}
          desktopNavGrabRef={desktopNavGrabRef}
          onIntroLockChange={setHeroIntroLocked}
        />
        <Curriculum />
      </div>
      <ScrollBand />
      <div className="cv-page-tail">
        <BelowCvGallery />
        <ContactFooter />
      </div>
      <HireToast />
    </div>
  )
}
