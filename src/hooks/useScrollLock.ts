import { useEffect } from 'react'

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const { body } = document
    const root = document.getElementById('root')

    html.classList.add('hero-scroll-lock')
    body.classList.add('hero-scroll-lock')
    root?.classList.add('hero-scroll-lock')

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    const blockScroll = (event: Event) => {
      event.preventDefault()
    }

    const blockKeys = (event: KeyboardEvent) => {
      const keys = new Set([
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
        'Spacebar',
      ])
      if (keys.has(event.key)) event.preventDefault()
    }

    window.addEventListener('wheel', blockScroll, { passive: false })
    window.addEventListener('touchmove', blockScroll, { passive: false })
    window.addEventListener('keydown', blockKeys)

    return () => {
      window.removeEventListener('wheel', blockScroll)
      window.removeEventListener('touchmove', blockScroll)
      window.removeEventListener('keydown', blockKeys)

      html.classList.remove('hero-scroll-lock')
      body.classList.remove('hero-scroll-lock')
      root?.classList.remove('hero-scroll-lock')

      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''

      window.scrollTo(0, scrollY)
    }
  }, [active])
}
