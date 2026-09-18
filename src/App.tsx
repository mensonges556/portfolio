import { useRef } from 'react'
import { BelowCvGallery } from './components/BelowCvGallery'
import { Curriculum } from './components/Curriculum'
import { DesktopNav } from './components/DesktopNav'
import { Hero } from './components/Hero'
import { ContactFooter } from './components/ContactFooter'
import { HireToast } from './components/HireToast'
import { ScrollBand } from './components/ScrollBand'

export default function App() {
  const desktopNavHeaderRef = useRef<HTMLElement>(null)
  const desktopNavGrabRef = useRef<HTMLElement>(null)

  return (
    <div className="min-w-0 max-w-full">
      <DesktopNav headerRef={desktopNavHeaderRef} grabRef={desktopNavGrabRef} />
      <Hero
        desktopNavHeaderRef={desktopNavHeaderRef}
        desktopNavGrabRef={desktopNavGrabRef}
      />
      <Curriculum />
      <ScrollBand />
      <div className="cv-page-tail">
        <BelowCvGallery />
        <ContactFooter />
      </div>
      <HireToast />
    </div>
  )
}
