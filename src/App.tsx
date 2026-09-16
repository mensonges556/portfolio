import { useRef } from 'react'
import { Curriculum } from './components/Curriculum'
import { DesktopNav } from './components/DesktopNav'
import { Hero } from './components/Hero'
import { HireToast } from './components/HireToast'
import { ScrollBand } from './components/ScrollBand'

export default function App() {
  const desktopNavHeaderRef = useRef<HTMLElement>(null)
  const desktopNavToggleRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="min-w-0 max-w-full overflow-x-clip">
      <DesktopNav headerRef={desktopNavHeaderRef} toggleRef={desktopNavToggleRef} />
      <Hero
        desktopNavHeaderRef={desktopNavHeaderRef}
        desktopNavGrabRef={desktopNavToggleRef}
      />
      <Curriculum />
      <ScrollBand />
      <HireToast />
    </div>
  )
}
