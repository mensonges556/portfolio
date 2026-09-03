import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { initSmoothScroll, lockScroll } from './lib/scroll'
import { EASE_OUT } from './lib/motion'
import { Grain } from './components/Grain'
import { CustomCursor } from './components/CustomCursor'
import { PageLoader } from './components/PageLoader'
import { Navigation } from './components/Navigation'
import { Hud } from './components/Hud'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Work } from './components/Work'
import { About } from './components/About'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ui } from './data/site'

export default function App() {
  /** True once the loader curtain starts lifting — the cue for the hero. */
  const [ready, setReady] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => initSmoothScroll(), [])

  // Always open at the top: a restored scroll position would fight the intro.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    lockScroll(true)
  }, [])

  const handleReveal = useCallback(() => {
    setReady(true)
    lockScroll(false)
  }, [])

  const handleDone = useCallback(() => setLoaderVisible(false), [])

  return (
    // `reducedMotion="user"` makes every transform/layout animation in the
    // tree respect the OS setting without per-component branching.
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT }}>
      <a className="skip-link" href="#main">
        {ui.skipLink}
      </a>

      <Grain />
      <CustomCursor />

      <AnimatePresence>
        {loaderVisible ? (
          <PageLoader key="loader" onReveal={handleReveal} onDone={handleDone} />
        ) : null}
      </AnimatePresence>

      <Navigation ready={ready} />
      <Hud ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <Manifesto />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
